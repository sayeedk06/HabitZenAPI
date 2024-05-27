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

// const connection = mysql
//   .createConnection({
//     host: "localhost",
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: "habitzen",
//   })
//   .promise();

// module.exports = connection;