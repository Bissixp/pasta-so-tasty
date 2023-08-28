const { DataTypes } = require('sequelize')

const atributtes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  first_name: {
    type: DataTypes.STRING
  },
  last_name: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  role: {
    type: DataTypes.STRING
  }
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Users', atributtes)
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Users')
  }
}
