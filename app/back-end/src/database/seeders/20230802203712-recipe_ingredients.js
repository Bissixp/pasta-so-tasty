module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'RecipeIngredients',
      [
        {
          id: 1,
          recipe_ingredient_1: '3 colheres de margarina',
          recipe_ingredient_2: '2 xícaras de leite',
          recipe_ingredient_3: 'sal e noz-moscada a gosto',
          recipe_ingredient_4: '2 dentes de alho amassados',
          recipe_ingredient_5: '300 g de carne moída',
          recipe_ingredient_6: '3/4 xícara de água quente',
          recipe_ingredient_7: '200 g de presunto fatiada',
          recipe_ingredient_8: '250 g de massa para lasanha',
          recipe_ingredient_9: '4 colheres de farinha de trigo',
          recipe_ingredient_10: '2 latas de creme de leite',
          recipe_ingredient_11: '1 colher de óleo',
          recipe_ingredient_12: '1 cebola picada',
          recipe_ingredient_13: '3 xícaras de polpa de tomate batida no liquidificador',
          recipe_ingredient_14: 'sal a gosto',
          recipe_ingredient_15: '200 g de mussarela fatiada'
        },
        {
          id: 2,
          recipe_ingredient_1: '1 Cebola',
          recipe_ingredient_2: '1 tomates picados',
          recipe_ingredient_3: '2 dentes de alho amassados',
          recipe_ingredient_4: '1 colher de sopa de azeite de oliva',
          recipe_ingredient_5: '1 pacote de molho de tomate pronto',
          recipe_ingredient_6: '1 pacote de Macarrão',
          recipe_ingredient_7: '150g de Carne Moída'
        },
        {
          id: 3,
          recipe_ingredient_1: '1 Cebola picada',
          recipe_ingredient_2: '2 dentes de alho amassados',
          recipe_ingredient_3: '2 colheres de farinha de trigo',
          recipe_ingredient_4: '2 colheres de margarina',
          recipe_ingredient_5: '500 ml de leite',
          recipe_ingredient_6: '1 pacote de Macarrão',
          recipe_ingredient_7: '1 lata  de creme de leite',
          recipe_ingredient_8: 'sal e noz-moscada a gosto'
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
