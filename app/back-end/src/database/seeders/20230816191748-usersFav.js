module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'UsersFavs',
      [
        {
          user_id: 1,
          recipe_fav_id: 2
        }
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('UsersFavs', null, {})
  }
}
