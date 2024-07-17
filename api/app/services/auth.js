const UserService = require("./users");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

require('dotenv').config();

const service = new UserService();

class AuthService {

  async getUser(email, password){
    const user = await service.find_by_email(email);
    if(!user){
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }
  async signToken(user){
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    return {
      user,
      token
    };
  }

  async sendMailer(email){
    const user = await service.find_by_email(email);
    if(!user){
      throw boom.unauthorized();
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "j.doublekill317@gmail.com",
        pass: "ngdh qwyv oeta zhur",
      },
    });
    await transporter.sendMail({
      from: '"Node App 👻" <j.doublekill317@gmail.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    return { message: "Message send"}
  }
}

module.exports = AuthService;