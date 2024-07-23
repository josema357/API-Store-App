const UserService = require('./users');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

require('dotenv').config();

const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.find_by_email(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }
  async signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return {
      user,
      token,
    };
  }
  async sendRecovery(email) {
    const user = await service.find_by_email(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = {sub: user.id};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "5min"});
    const link = `http://myfrontend.com/recovery?token=${token}`
    await service.update_user(user.id, {recoveryToken: token})
    const mail = {
      from: `"Node App 👻" <${process.env.SMTP_EMAIL}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Recover password ✔', // Subject line
      html: `<b>Click on link : ${link}</b>`, // html body
    };
    const response = await this.sendMail(mail);
    return response;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'Message sent' };
  }
}

module.exports = AuthService;
