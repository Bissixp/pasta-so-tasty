module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Recipes',
      [

        {
          author_id: 1,
          author_name: 'Pasta So Tasty',
          recipe_name: 'Lasanha à Bolonhesa',
          recipe_photo: 'https://zh.rbsdirect.com.br/imagesrc/23094103.jpg?w=700',
          recipe_ingredients_id: 1,
          recipe_description: 'Molho branco: Derreta a margarina e junte o alho e a cebola até dourar, após isso doure a farinha em fogo baixo mexendo sempre, junte o leite aos poucos. Cozinhe até obter um molho encorpado, acrescente o creme de leite e tempere com sal e noz-moscada. Reserve.\nMolho a bolonhesa: Aqueça o óleo junte o alho e a cebola até dourar. Acrescente a carne moída até fritar, quando a carne estiver frita acrescente a polpa de tomate e a água misture o sal e cozinhe até ferver.\nMontagem: Em um refratário grande, coloque uma camada de molho à bolonhesa, massa para lasanha, presunto, mussarela, molho branco. Adicione mais massa para lasanha presunto e mussarela e termine com molho à bolonhesa. Se quiser, polvilhe um pouco de queijo parmesão ralado e leve ao forno para gratinar por 20 minutos.',
          recipe_cooking_time: 40,
          recipe_type: 'Massa',
          status_recipe: 'approved'
        },
        {
          author_id: 1,
          author_name: 'Pasta So Tasty',
          recipe_name: 'Macarrão à Bolonhesa',
          recipe_photo: 'https://static.itdg.com.br/images/1200-630/7c13d4a45d6696c610cf9664e477e836/macarrao-a-bolonhesa.jpg',
          recipe_ingredients_id: 2,
          recipe_description: 'Pique a cebola, refogue por alguns minutos em uma panela com óleo quente até dourar a cebola e depois adicione o alho, mexendo para não queimar.\nMisture a carne moída, deixe cozinhar por alguns minutos.\nAdicione o molho, os tomates picados e mexa bem, deixe cozinhar por aproximadamente 5 minutos em fogo baixo.\nPrepare o macarrão, misture o molho ao macarrão e sirva.\nAcompanhamento Sugerido: Queijo Ralado',
          recipe_cooking_time: 30,
          recipe_type: 'Massa',
          status_recipe: 'approved'
        },
        {
          author_id: 1,
          author_name: 'Pasta So Tasty',
          recipe_name: 'Macarrão ao molho branco',
          recipe_photo: 'https://cdn.casaeculinaria.com/wp-content/uploads/2023/02/20115647/Macarrao-ao-molho-branco.jpg',
          recipe_ingredients_id: 3,
          recipe_description: 'Molho branco: Derreta a margarina e junte o alho e a cebola até dourar, após isso doure a farinha em fogo baixo mexendo sempre, junte o leite aos poucos. Cozinhe até obter um molho encorpado, acrescente o creme de leite e tempere com sal e noz-moscada. Reserve.\nPrepare o macarrão, misture o molho ao macarrão e sirva.\nAcompanhamento Sugerido: Queijo Ralado',
          recipe_cooking_time: 30,
          recipe_type: 'Massa',
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
