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
        },
        {
          author_id: 1,
          author_name: 'Pasta So Tasty',
          recipe_name: 'Rocambole de carne moída',
          recipe_photo: 'https://www.queroreceita.com.br/_next/image?url=https%3A%2F%2Fstatic.queroreceita.com.br%2Fmedia%2FrzPHAuUI5EaLOWdaQp91.jpg&w=640&q=75',
          recipe_ingredients_id: 4,
          recipe_description: 'Tempere a carne moída com a sopa de cebola, o tempero verde e o sal.\nColoque a carne temperada sobre uma folha de papel laminado ou papel manteiga e abra a massa com um rolo, na espessura de 1 cm, mais ou menos.\nForre a carne com o presunto e o queijo, pode-se colocar também milho verde, ervilha e requeijão.\nEnrole a carne, com ajuda da folha de papel laminado ou manteiga, em forma de rocambole.\nLeve ao forno, em temperatura alta, por mais ou menos 30 minutos ou no microondas por 15 minutos.\nBom apetite!',
          recipe_cooking_time: 30,
          recipe_type: 'Carne',
          status_recipe: 'approved'
        },
        {
          author_id: 1,
          author_name: 'Pasta So Tasty',
          recipe_name: 'Bife à parmegiana',
          recipe_photo: 'https://assets.unileversolutions.com/recipes-v2/215082.jpg',
          recipe_ingredients_id: 5,
          recipe_description: 'Tempere os bifes com os ingredientes secos e faça-os à milanesa.\nFrite e leve-os à uma assadeira.\nCubra-os com o presunto e mussarela, coloque o molho por último.\nLeve ao forno para derreter a mussarela.',
          recipe_cooking_time: 30,
          recipe_type: 'Carne',
          status_recipe: 'approved'
        },
        {
          author_id: 1,
          author_name: 'Pasta So Tasty',
          recipe_name: 'Almôndegas',
          recipe_photo: 'https://www.mariareceita.com.br/wp-content/uploads/2022/03/receita-almondegas-facil-1200x900.jpg',
          recipe_ingredients_id: 6,
          recipe_description: 'Misture a carne com o ovo, a cebola, o sal, um pouco de azeite de oliva (ou óleo) e a pimenta.\nAgregue a farinha até dar o ponto de enrolar as almôndegas.\nFaça pequenas bolinhas.\nEm uma panela com um pouco de azeite, frite as almôndegas selando-as em fogo alto.\nRetire as almôndegas e reserve.\nEm outra panela, esquente o molho de tomate em fogo baixo.\nNa mesma panela da almôndega, elimine o excesso de azeite e coloque o molho de tomate, colocando as almôndegas para cozinhar por alguns minutos.\nEm cerca de 15 minutos as almôndegas estarão totalmente cozidas e o prato estará pronto.',
          recipe_cooking_time: 30,
          recipe_type: 'Carne',
          status_recipe: 'approved'
        },
        {
          author_id: 1,
          author_name: 'Pasta So Tasty',
          recipe_name: 'Filé de frango à parmegiana',
          recipe_photo: 'https://www.receiteria.com.br/wp-content/uploads/frango-a-parmegiana-sem-fritura-00.jpg',
          recipe_ingredients_id: 7,
          recipe_description: 'Coloque os filés entre 2 filmes plásticos.\nBata suavemente com o martelo de carne para ficarem com a mesma espessura.\nTempere - os com o alho, o sal e a pimenta.\nPasse - os pela maionese e a farinha de rosca.\nColoque em uma assadeira untado com o óleo.\nLeve ao forno médio por uns 30 minutos.\nRetire do forno, cubra com a mussarela, o molho e o óregano.\nLeve ao forno novamente só para gratinar.',
          recipe_cooking_time: 30,
          recipe_type: 'Ave',
          status_recipe: 'approved'
        },
        {
          author_id: 1,
          author_name: 'Pasta So Tasty',
          recipe_name: 'Strogonoff de frango',
          recipe_photo: 'https://tudodereceitas.com.br/wp-content/uploads/2022/01/Strogonoff-de-frango-768x433.jpg',
          recipe_ingredients_id: 8,
          recipe_description: 'Em uma panela, misture o frango, o alho, a maionese, o sal e a pimenta.\nEm uma frigideira grande, derreta a manteiga e doure a cebola.\nJunte o frango temperado até que esteja dourado.\nAdicione os cogumelos, o ketchup e a mostarda.\nIncorpore o creme de leite e retire do fogo antes de ferver.\nSirva com arroz branco e batata palha.',
          recipe_cooking_time: 30,
          recipe_type: 'Ave',
          status_recipe: 'approved'
        },
        {
          author_id: 1,
          author_name: 'Pasta So Tasty',
          recipe_name: 'Risoto de frango',
          recipe_photo: 'https://www.hojetemfrango.com.br/wp-content/uploads/2019/02/shutterstock_283652819.jpg',
          recipe_ingredients_id: 9,
          recipe_description: 'Cozinhe o arroz.\nCozinhe e desfie o frango.\nRefogue a cebola, e o alho, acrescente o sal.\nAcrescente o frango, milho, o molho de tomate e o creme de leite, se precisar coloque um pouco de água para ficar mais molhadinho.\nDeixe dar uma fervida.\nMisture o arroz com o molho.\nCorte o queijo em cubos.\nColoque no arroz e leve ao forno por 10 minutos.',
          recipe_cooking_time: 40,
          recipe_type: 'Ave',
          status_recipe: 'approved'
        },
        {
          author_id: 1,
          author_name: 'Pasta So Tasty',
          recipe_name: 'Pão de Calabresa',
          recipe_photo: 'https://cozinhaparamortais.files.wordpress.com/2016/09/67_pao_calabresa1.jpg?w=1200',
          recipe_ingredients_id: 10,
          recipe_description: 'Junte em um refratário primeiro a farinha, o açúcar, o sal e o fermento.\nDepois coloque a manteiga, o ovo e mexa.\nColoque água aos poucos até dar o ponto da massa, que não grude nas mãos.\nAmasse bem e leve à massa para crescer, mais ou menos 30 minutos, depende da temperatura.\nAbra a massa não muita fina nem muito grossa.\nRecheie e feche como um rocambole.\nDeixe crescer por mais uns 20 minutos, pincele com 1 gema e polvilhe orégano ou o que você preferir.\nLeve para assar por aproximadamente 20 a 30 minutos, até dourar.',
          recipe_cooking_time: 40,
          recipe_type: 'Pão',
          status_recipe: 'approved'
        },
        {
          author_id: 1,
          author_name: 'Pasta So Tasty',
          recipe_name: 'Focaccia',
          recipe_photo: 'https://www.padeirodeapartamento.com.br/wp-content/uploads/2020/12/Fc_2.jpg',
          recipe_ingredients_id: 11,
          recipe_description: 'Junte a farinha com o leite morno, misturado com o fermento, o sal e açúcar.\nMisture bem e acrescente o ovo.\nDepois de bem amassado deixe repousar por 15 minutos.\nAbra a massa e coloque em assadeira untado com azeite.\nFaça pressão com os dedos por toda a massa, regue com o azeite e alecrim.\nLeve para assar por 15 minutos, retire do forno e acrescente os tomates e azeitonas.\nVolte ao forno para terminar de assar.',
          recipe_cooking_time: 50,
          recipe_type: 'Pão',
          status_recipe: 'approved'
        },
        {
          author_id: 1,
          author_name: 'Pasta So Tasty',
          recipe_name: 'Bruschetta',
          recipe_photo: 'https://static.itdg.com.br/images/1200-630/dadafb5a13a8fc316bded0ea8feb2a37/326223-original.jpg',
          recipe_ingredients_id: 12,
          recipe_description: 'Corte os tomates em cubinhos e amasse o dente de alho.\nEm um recipiente, junte-os ao azeite, misturando bem.\nAdicione o manjericão, o orégano e o sal e mexa novamente. Reserve.\nRegue as fatias de pão com azeite a gosto e leve-as ao forno até dourarem.\nSobre as fatias de pão, coloque as fatias de mussarela de búfala (opcional).\nColoque por cima de cada uma um pouco da mistura e sirva ainda quentinho, finalize com folhinhas de manjericão e volte com as torradas ao forno por de 5 a 10 minutos.',
          recipe_cooking_time: 40,
          recipe_type: 'Pão',
          status_recipe: 'approved'
        },
        {
          author_id: 1,
          author_name: 'Pasta So Tasty',
          recipe_name: 'Minestrone',
          recipe_photo: 'https://receitinhas.com.br/wp-content/uploads/2017/03/Minestrone-2.png',
          recipe_ingredients_id: 13,
          recipe_description: 'Em uma panela de pressão, frite o toucinho até que a gordura derreta.\nJunte a cebola e o alho na panela com o bacon.\nFrite até dourar.\nAcrescente a água, o sal, a pimenta e a carne e tampe a panela\nDeixe cozinhar depois que pegar pressão por 20min.\nRetire do fogo e espere a pressão sair.\nAbra a panela e coloque a cenoura, a batata, o aipo, a pimenta, os tomates e os cubos de caldo, se necessário coloque mais água.\nAcerte o sal e deixe cozinhar sem tampar a panela até que os legumes estejam cozidos.\nSe desejar um caldo mais grosso deixe cozinhar por mais tempo.',
          recipe_cooking_time: 40,
          recipe_type: 'Sopa',
          status_recipe: 'approved'
        },
        {
          author_id: 1,
          author_name: 'Pasta So Tasty',
          recipe_name: 'Sopa de Cebola',
          recipe_photo: 'https://img.cybercook.com.br/receitas/774/sopa-de-cebola-4.jpeg',
          recipe_ingredients_id: 14,
          recipe_description: 'Refogar na manteiga o alho, a cebola e as batatas.\nDissolver em 2 colheres de água fria o caldo de carne, sal, pimenta e farinha de trigo.\nJuntar tudo mais a água fervente e cozinhar por 20 minutos.\nDesligue o fogo e acrescente o creme de leite.\nBata tudo no liquidificador e leve ao fogo.\nAntes de servir, polvilhe com salsa e queijo. Bom apetite.',
          recipe_cooking_time: 40,
          recipe_type: 'Sopa',
          status_recipe: 'approved'
        },
        {
          author_id: 1,
          author_name: 'Pasta So Tasty',
          recipe_name: 'Sopa de capeletti',
          recipe_photo: 'https://img.cybercook.com.br/receitas/556/sopa-de-capeletti.jpeg',
          recipe_ingredients_id: 15,
          recipe_description: 'Reserve previamente 1 litro de água fervente.\nEm uma panela de pressão, coloque bastante azeite enchendo bem o fundo da panela.\nColoque o alho e o orégano no azeite ainda frio.\nLeve ao fogo, Quando o alho ficar branco, coloque rapidamente a cebola bem ralada.\nMexa um pouco e coloque os cogumelos partidos ao meio.\nColoque a carne escolhida (ou frango), e frite superficialmete, Coloque a salsa, o sal e os temperos referentes ao tipo de carne escolhida.\nColoque meio litro de água já fervente.\nDeixe cozinhar até um pouco antes da carne ficar macia (o tempo depende da carne escolhida).\nTire a panela da pressão antes da carne completar o cozimento.\nAcrescente o capeletti e coloque o restante da água fervente.\nRetorne para pressão por cerca de dez minutos.\nRetire da pressão e verifique se a massa já esta cozida.\nCaso não esteja termine de cozinhar sem a pressão.\nSirva bem quente acompanhado com pães de azeite e alho e queijo ralado.',
          recipe_cooking_time: 30,
          recipe_type: 'Sopa',
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
