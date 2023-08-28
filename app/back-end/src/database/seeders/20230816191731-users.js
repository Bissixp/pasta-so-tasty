module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          first_name: 'Fernando',
          last_name: 'Bissi',
          password: 'bissi@23',
          email: 'bissixp@gmail.com',
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
