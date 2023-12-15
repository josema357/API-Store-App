const express = require('express');
const UserService = require('../Services/users')

const router = express.Router();
const service = new UserService();

router.get('/', (req, res) => {
  const users= service.findAll();
  res.json(users);
});

router.get('/:id', (req, res) => {
    const { params:{id}} = req;
    const user= service.findOne(id);
    res.json(user);
  });

router.post('/', (req, res)=>{
    const { body } = req;
    const user = service.create(body);
    res.json(user)
})

router.patch('/:id', (req, res)=>{
    const { body, params:{id} } = req;
    const user = service.update(id, body);
    res.json(user) 
})

router.delete('/:id', (req, res)=>{
    const { params:{id} } = req;
    const response = service.delete(id);
    res.json(response)
}) 

module.exports = router;
