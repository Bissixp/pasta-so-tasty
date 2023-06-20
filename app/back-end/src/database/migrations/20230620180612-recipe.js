const { DataTypes } = require('sequelize')

const atributtes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  recipe_author_name: {
    type: DataTypes.STRING
  },
  recipe_name: {
    type: DataTypes.STRING
  },
  recipe_photo: {
    type: DataTypes.STRING
  },
  recipe_ingredients_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'RecipeIngredients',
      key: 'id'
    }
  },
  recipe_description: {
    type: DataTypes.STRING
  },
  recipe_cooking_time: {
    type: DataTypes.INTEGER
  }
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Recipes', atributtes)
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Recipes')
  }
}
