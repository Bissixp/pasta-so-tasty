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
          recipe_ingredient_1: '1 Cebola picada',
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
        },
        {
          id: 4,
          recipe_ingredient_1: '1/2 kg de carne moída',
          recipe_ingredient_2: 'presunto fatiado',
          recipe_ingredient_3: 'tempero verde',
          recipe_ingredient_4: '1 pacote de sopa de cebola',
          recipe_ingredient_5: 'queijo fatiado',
          recipe_ingredient_6: 'sal a gosto'
        },
        {
          id: 5,
          recipe_ingredient_1: '1 kg de contra filé',
          recipe_ingredient_2: '2 alhos picado',
          recipe_ingredient_3: 'sal a gosto',
          recipe_ingredient_4: '200g de presunto',
          recipe_ingredient_5: '1 lata de molho de tomate pronto',
          recipe_ingredient_6: '1 cebola ralada',
          recipe_ingredient_7: 'farinha de rosca',
          recipe_ingredient_8: '200 g de mussarela',
          recipe_ingredient_9: '1 gema de ovo para empanar os bifes'
        },
        {
          id: 6,
          recipe_ingredient_1: '500 g de carne moída',
          recipe_ingredient_2: '1 Cebola picada',
          recipe_ingredient_3: '150 g de farinha de rosca',
          recipe_ingredient_4: 'pimenta-do-reino a gosto',
          recipe_ingredient_5: '2 colheres (sopa) de azeite de oliva (30 ml)',
          recipe_ingredient_6: '1 ovo',
          recipe_ingredient_7: 'sal a gosto',
          recipe_ingredient_8: '395 g de molho de tomate'
        },
        {
          id: 7,
          recipe_ingredient_1: '6 filés de peito de frango',
          recipe_ingredient_2: 'sal a gosto',
          recipe_ingredient_3: '4 colheres de (sopa) de maionese',
          recipe_ingredient_4: '1 lata de molho de tomate',
          recipe_ingredient_5: 'óleo o suficiente para untar',
          recipe_ingredient_6: '2 dentes de alho',
          recipe_ingredient_7: 'pimenta-do-reino a gosto',
          recipe_ingredient_8: '2 xícaras de (chá) de farinha de rosca',
          recipe_ingredient_9: '200 g de mussarela',
          recipe_ingredient_10: 'orégano a gosto'
        },
        {
          id: 8,
          recipe_ingredient_1: '3 peitos de frango cortados em cubos',
          recipe_ingredient_2: 'sal a gosto',
          recipe_ingredient_3: '1 cebola picada',
          recipe_ingredient_4: '1 colher de manteiga',
          recipe_ingredient_5: '1/3 copo de mostarda',
          recipe_ingredient_6: '1 copo de creme de leite',
          recipe_ingredient_7: '1 dente de alho picado',
          recipe_ingredient_8: 'pimenta-do-reino a gosto',
          recipe_ingredient_9: '2 colheres (sopa) de maionese',
          recipe_ingredient_10: '1/2 copo de ketchup',
          recipe_ingredient_11: '1 copo de cogumelos',
          recipe_ingredient_12: 'batata palha a gosto'
        },
        {
          id: 9,
          recipe_ingredient_1: '400 g de frango desfiado',
          recipe_ingredient_2: '1 caixa de creme de leite',
          recipe_ingredient_3: '100 g de queijo mussarela',
          recipe_ingredient_4: 'Molho de tomate',
          recipe_ingredient_5: 'Sal a gosto',
          recipe_ingredient_6: '1 copo de arroz',
          recipe_ingredient_7: '1 lata de milho',
          recipe_ingredient_8: '1 cebola picada',
          recipe_ingredient_9: '1 dente de alho'
        },
        {
          id: 10,
          recipe_ingredient_1: '1 ovo',
          recipe_ingredient_2: '1 colher (chá) de sal',
          recipe_ingredient_3: '1 colher de manteiga ou margarina',
          recipe_ingredient_4: '1 gomo de calabresa defumada e picada',
          recipe_ingredient_5: 'Água morna até o ponto',
          recipe_ingredient_6: '4 xícaras de farinha de trigo',
          recipe_ingredient_7: '2 colheres (sopa) de açúcar',
          recipe_ingredient_8: '1 pacotinho do fermento seco',
          recipe_ingredient_9: 'Temperos a gosto (orégano, salsinha etc)'
        },
        {
          id: 11,
          recipe_ingredient_1: '400 g farinha de trigo',
          recipe_ingredient_2: '1 colher de chá de sal',
          recipe_ingredient_3: '1 ovo',
          recipe_ingredient_4: 'Sal grosso',
          recipe_ingredient_5: 'Alecrim',
          recipe_ingredient_6: '30 g fermento biológico',
          recipe_ingredient_7: '1 colher (sobremesa) açúcar',
          recipe_ingredient_8: '250 ml leite morno',
          recipe_ingredient_9: '1/4 xícara de azeite',
          recipe_ingredient_10: '2 tomates sem pele picados',
          recipe_ingredient_11: '1/2 xícara azeitonas picadas'
        },
        {
          id: 12,
          recipe_ingredient_1: 'fatias de pão italiano ou baguete',
          recipe_ingredient_2: '1/2 xicara de azeite + quanto baste para regar o pão',
          recipe_ingredient_3: '1 colher (sopa) de orégano',
          recipe_ingredient_4: 'sal a gosto',
          recipe_ingredient_5: '2 tomates bem maduros',
          recipe_ingredient_6: '1 dente de alho',
          recipe_ingredient_7: 'folhas de majericão',
          recipe_ingredient_8: 'fatias de mussarela de búfala (opcional)'
        },
        {
          id: 13,
          recipe_ingredient_1: '200g de toucinho picado',
          recipe_ingredient_2: '2 cebolas picadas',
          recipe_ingredient_3: '6 dentes de alho picados',
          recipe_ingredient_4: '1l de água',
          recipe_ingredient_5: '500g de carne de 2ª picada em pedaços médios',
          recipe_ingredient_6: '2 cenouras picadas',
          recipe_ingredient_7: '2 batatas picadas',
          recipe_ingredient_8: '1 talo de aipo picado',
          recipe_ingredient_9: 'Pimenta-do-reino a gosto',
          recipe_ingredient_10: '2 tomates picados',
          recipe_ingredient_11: '2 cubos de caldo de galinha ou caldo de carne',
          recipe_ingredient_12: 'Sal a gosto'
        },
        {
          id: 14,
          recipe_ingredient_1: '1 dente de alho',
          recipe_ingredient_2: '1 colher de farinha de trigo',
          recipe_ingredient_3: '2 batatas pré-cozidas picadas',
          recipe_ingredient_4: '4 xícaras de água fervente',
          recipe_ingredient_5: 'Sal',
          recipe_ingredient_6: '1 tablete de caldo de carne',
          recipe_ingredient_7: '1/2 lata de creme de leite sem soro',
          recipe_ingredient_8: '2 colheres de manteiga',
          recipe_ingredient_9: '400 g de cebola fatiada',
          recipe_ingredient_10: 'Pimenta do reino a gosto'
        },
        {
          id: 15,
          recipe_ingredient_1: '1 kg de capeletti (carne ou frango)',
          recipe_ingredient_2: '1 colher de sopa de cebola bem ralada',
          recipe_ingredient_3: 'azeite suficiente para encher bem o fundo da panela de pressão (dois dedos)',
          recipe_ingredient_4: 'sal a gosto',
          recipe_ingredient_5: '1 pitada pequena de cominho (para frango)',
          recipe_ingredient_6: '1 peito de frango pequeno cortado em cubos',
          recipe_ingredient_7: '1 cubo de caldo de carne ou frango',
          recipe_ingredient_8: '2 dentes de alho bem amassado',
          recipe_ingredient_9: '1 colher de chá de orégano',
          recipe_ingredient_10: 'salsa a gosto',
          recipe_ingredient_11: '1 copinho de cogumelos (champignon de 150 a 200 g)',
          recipe_ingredient_12: '1 pitada de pimente do reino (para carne)',
          recipe_ingredient_13: '1/2 kg de carne em cubinhos pequenos (não moída)'
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
