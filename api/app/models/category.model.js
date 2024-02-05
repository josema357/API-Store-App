const {Model, DataTypes, Sequelize} =require('sequelize');

const CATEGORY_TABLE='categories';
const CategorySchema={
    id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW
    }
}

class Category extends Model{
    static associate(){

    }
    static config(sequelize){
        return{
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category',
            timestamps: false
        }
    }
}

module.exports = {CATEGORY_TABLE, CategorySchema, Category};