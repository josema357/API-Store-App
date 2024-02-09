'use strict';

const {UserSchema, USER_TABLE} = require('../models/user.model');
const { DataTypes, Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(USER_TABLE, 'role' , UserSchema.rol);
    await queryInterface.changeColumn(USER_TABLE, 'created_at' , UserSchema.createdAt);
  },

  async down (queryInterface) {
    await queryInterface.changeColumn(USER_TABLE, 'role' , {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'customer'
  });
    await queryInterface.changeColumn(USER_TABLE, 'created_at' , {
      allowNull:false,
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW
  });
  }
};
