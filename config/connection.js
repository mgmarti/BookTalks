/*==================================
          MySQL Connection
==================================*/

const mysql = require('mysql');

const connection = mysql.createConnection(process.env.JAWSDB_URL ||{
    host: 'localhost',
    user: 'root',
    password: process.env.SQL_KEY,
    database: 'booktalks'
})

// if (process.env.JAWSDB_URL) {
//     connection = mysql.createConnection(process.env.JAWSDB_URL || );
// } else {
//     connection = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'root',
//         database: 'tacos_db'


//     });
// };

connection.connect(function (err) {
    console.log("Connected as id: " + connection.threadId);
});

module.exports = connection;