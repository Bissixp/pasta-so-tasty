const { DataTypes } = require('sequelize')

const atributtes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  recipe_ingredient_1: {
    type: DataTypes.STRING
  },
  recipe_ingredient_2: {
    type: DataTypes.STRING
  },
  recipe_ingredient_3: {
    type: DataTypes.STRING
  },
  recipe_ingredient_4: {
    type: DataTypes.STRING
  },
  recipe_ingredient_5: {
    type: DataTypes.STRING
  },
  recipe_ingredient_6: {
    type: DataTypes.STRING
  },
  recipe_ingredient_7: {
    type: DataTypes.STRING
  },
  recipe_ingredient_8: {
    type: DataTypes.STRING
  },
  recipe_ingredient_9: {
    type: DataTypes.STRING
  },
  recipe_ingredient_10: {
    type: DataTypes.STRING
  },
  recipe_ingredient_11: {
    type: DataTypes.STRING
  },
  recipe_ingredient_12: {
    type: DataTypes.STRING
  },
  recipe_ingredient_13: {
    type: DataTypes.STRING
  },
  recipe_ingredient_14: {
    type: DataTypes.STRING
  },
  recipe_ingredient_15: {
    type: DataTypes.STRING
  },
  recipe_ingredient_16: {
    type: DataTypes.STRING
  },
  recipe_ingredient_17: {
    type: DataTypes.STRING
  },
  recipe_ingredient_18: {
    type: DataTypes.STRING
  },
  recipe_ingredient_19: {
    type: DataTypes.STRING
  },
  recipe_ingredient_20: {
    type: DataTypes.STRING
  }
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('RecipeIngredients', atributtes)
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('RecipeIngredients')
  }
}
