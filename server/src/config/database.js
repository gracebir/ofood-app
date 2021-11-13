require('dotenv').config()

const {
  DB_NAME, DB_PORT, DB_HOST, DB_USER, DB_PASSWORD,R_URL
} = process.env
console.log(DB_NAME, DB_PORT, DB_HOST, DB_USER, DB_PASSWORD,R_URL)
module.exports={
  development:{
    username : DB_USER,
    password : DB_PASSWORD,
    database : DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql'
  },
  test:{
    url: R_URL,
    dialect:'mysql'
  },
  production: {
    username : DB_USER,
    password : DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    host: DB_HOST,
    dialect: 'mysql'
  }
}
