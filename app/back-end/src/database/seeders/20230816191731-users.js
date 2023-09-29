module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          first_name: 'Pasta',
          last_name: 'So Tasty',
          password: '$2b$10$5QRp0OKj7YKd3XY5Q10LkeWNywGOXO9R7tHzMUYNFXKV7QHvBVixy',
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
