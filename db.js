require('dotenv').config()

module.exports = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    database: 'habitzen',
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  }
}
