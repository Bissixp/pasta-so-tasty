module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'RecipeIngredients',
      [
        {
          id: 1,
          recipe_ingredient_1: '500g de Massa para lasanha',
          recipe_ingredient_2: '1kg de Carne Moída',
          recipe_ingredient_3: '1 pacote de Molho de Tomate'
        },
        {
          id: 2,
          recipe_ingredient_1: '4 xícaras de Farinha de trigo',
          recipe_ingredient_2: '2 Calabresas',
          recipe_ingredient_3: '1 pacote de Fermento para pão',
          recipe_ingredient_4: '2 Ovos',
          recipe_ingredient_5: '4 xícaras de Óleo',
          recipe_ingredient_6: 'meia colher de sopa de sal'
        }
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Recipes', null, {})
    await queryInterface.bulkDelete('RecipeIngredients', null, {})
  }
}
