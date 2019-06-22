/*==================================
          MySQL Connection
==================================*/

const mysql = require('mysql');
let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {

    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'booktalks'
    })
}

connection.connect(function (err) {
    console.log("Connected as id: " + connection.threadId);
});

module.exports = connection;