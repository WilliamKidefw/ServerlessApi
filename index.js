const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var sqlpool = require('./sqlpool')

app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log('Pet Theory REST API listening on port', port);
});

app.get('/', async (req, res) =>  {
    res.json({status: 'API is ready to serve ' + process.env.PORT});
});

app.get('/users', async(req, res) => {
const users = await getUsers();
res.json({status:'success', data: {users: users}});
});

app.get('/users/:id', async(req, res) => {
  const id = parseInt(req.params.id);
  const user = await getUser(id);
  res.json({status:'success', data: {user: user}});
});

async function getUser(id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM Usuario where id_usuario=?';
    getDbPool().query(sql, [id], (err, results) => {
      resolve(results[0]);
    });
  });
}

async function getUsers() {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM Usuario';
    getDbPool().query(sql, (err, results) => {
      resolve(results);
    });
  });
}

let cachedDbPool;
function getDbPool() {
  if(!cachedDbPool) {
    cachedDbPool = sqlpool
  }
  return cachedDbPool;
}

