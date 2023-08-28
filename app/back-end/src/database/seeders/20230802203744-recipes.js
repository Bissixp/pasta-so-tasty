module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Recipes',
      [
        {
          author_id: 1,
          author_name: 'Fernando Bissi',
          recipe_name: 'Lasanha à Bolonhesa',
          recipe_photo: 'https://zh.rbsdirect.com.br/imagesrc/23094103.jpg?w=700',
          recipe_ingredients_id: 1,
          recipe_description: 'Lasanha beeem gostosa que eu amo <3',
          recipe_cooking_time: 50,
          recipe_type: 'Carne',
          status_recipe: 'approved'
        },
        {
          author_id: 2,
          author_name: 'Vinicius Bertolazzi',
          recipe_name: 'Pão recheado de calabresa',
          recipe_photo: 'https://cozinhaparamortais.files.wordpress.com/2016/09/67_pao_calabresa1.jpg?w=1200',
          recipe_ingredients_id: 2,
          recipe_description: 'Pão muito gostoso do vinicin',
          recipe_cooking_time: 60,
          recipe_type: 'Carne',
          status_recipe: 'approved'
        }
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Recipes', null, {})
  }
}
