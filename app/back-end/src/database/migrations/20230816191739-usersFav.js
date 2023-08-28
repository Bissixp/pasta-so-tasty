const { DataTypes } = require('sequelize')

const atributtes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  recipe_fav_id: {
    allowNull: true,
    type: DataTypes.INTEGER
  }
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('UsersFavs', atributtes)
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('UsersFavs')
  }
}
