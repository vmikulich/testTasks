const mysql = require('mysql');

const connection = mysql.createConnection({
  host            : 'localhost',
  user            : 'root',
  password        : 'qazxcvbnm123',
  database        : 'sampleDB'
});
 
connection.connect(function (error) {
  if (error) throw error;
  console.log('Conected');
});

// connection.query('SELECT * FROM users', function(error, results, fields) {
//   if (error) {
//     console.log('Error in the query')
//   } else {
//     console.log(results)
//   }
// })

module.exports = {
  query: (queryText, params, callback) => {
    return connection.query(queryText, params, callback);
  }
}