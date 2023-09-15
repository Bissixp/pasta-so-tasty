module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          first_name: 'Pasta',
          last_name: 'So Tasty',
          password: 'pasta@23',
          email: 'pastasotasty@gmail.com',
          role: 'admin'
        }
      ],
      {}
    )
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
