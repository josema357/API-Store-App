const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class UserService {

  async create(data){
    const newUser= await models.User.create(data);
    return newUser;
  }

  async find_all(){
    const data = await models.User.findAll();
    return data;
  }

  async find_by_id(id){
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound("User not found");
    }
    return user;
  }

  async update_user(id, changes){
    const user = await this.find_by_id(id);
    const response = await user.update(changes);
    return response;
  }

  async delete(id){
    const user = await this.find_by_id(id);
    await user.destroy();
    return {
      user,
      message: "User Deleted"
    }
  }
}

module.exports = UserService;
