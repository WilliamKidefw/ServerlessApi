var mysql = require('mysql')
const dotenv = require('dotenv');
//dotenv.config();

var pool = mysql.createPool({
    connectionLimit: 1,
    //host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_NAME,
    socketPath: `/cloudsql/${process.env.INST_CON_NAME}`,
})

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }else if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }else if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }else{
            console.error(err)
        }
    }
    if (connection) connection.release()
    return
})
module.exports = pool