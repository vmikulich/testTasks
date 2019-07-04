const mySqlDb = require('../db/mySQLConn');

module.exports.getAll = async function(req, res) {
  await mySqlDb.query('SELECT * FROM users', function(error, results, fields) {
    if (error) {
      console.log('Error in the query')
    } else {
      res.status(200).json(results);
    }
  });
}

module.exports.getByFirstName = async function(req, res) {
  const queryText = 'SELECT * FROM users WHERE firstName = ?'
  await mySqlDb.query(queryText, req.params.firstName, function(error, results, fields) {
    if (error) {
      console.log('Error in the query')
    } else {
      res.status(200).json(results);
    }
  });
}