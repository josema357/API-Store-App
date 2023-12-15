const { faker } = require('@faker-js/faker');

class UserService {
  constructor() {
    this.users = [];
    this.generate();
  }
  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.commerce.isbn(10),
        name: faker.person.fullName(),
        job: faker.person.jobType()
      });
    }
  }

  create(data){
    const newUser={
        id: faker.commerce.isbn(10),
        ...data
    }
    this.users.push(newUser)
    return newUser;
  }

  findAll(){
    return this.users;
  }

  findOne(id){
    const user= this.users.find(item=>item.id===id);
    return user;
  }

  update(id, changes){
    const index = this.users.findIndex(item=>item.id===id);
    if(index===-1){
      throw new Error("User not found");
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
