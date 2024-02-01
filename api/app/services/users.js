const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('../../libs/sequelize');

class UserService {
  constructor() {
    this.users = [];
    this.generate();
  }
  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        job: faker.person.jobType()
      });
    }
  }

  create(data){
    const newUser={
        id: faker.string.uuid(),
        ...data
    }
    this.users.push(newUser)
    return newUser;
  }

  async find_all(){
    const data = await models.User.findAll();
    return data;
  }

  find_by_id(id){
    const user= this.users.find(item=>item.id===id);
    if(!user){
      throw boom.notFound("User not found");
    }
    return user;
  }

  update(id, changes){
    const index = this.users.findIndex(item=>item.id===id);
    if(index===-1){
      throw boom.notFound("User not found");
    }
    const user=this.users[index];
    this.users[index]={...user, ...changes}
    return this.users[index];
  }

  delete(id){
    const index=this.users.findIndex(item=>item.id===id);
    if(index===-1){
      throw new Error("User not found");
    }
    this.users.splice(index, 1);
    return {message: "User Deleted"}
  }
}

module.exports = UserService;
