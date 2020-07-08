const express = require('express');
var cors = require('cors')
const app = express();
const bodyParser = require('body-parser');
var sqlpool = require('./sqlpool')

app.use(cors());
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

app.get('/users/speciality/:speciality', async(req, res) => {
  const speciality = req.params.speciality;
  const user = await getUserbySpeciality(speciality);
  res.json({status:'success', data: {users: user}});
});

app.get('/users/gender/:gender', async(req, res) => {
  const gender = req.params.gender;
  const user = await getUserbyGender(gender);
  res.json({status:'success', data: {users: user}});
});

async function getUser(id) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM Usuario where id_usuario=?';
    getDbPool().query(sql, [id], (err, results) => {
      resolve(results[0]);
    });
  });
}

async function getUserbySpeciality(speciality) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM Usuario where especialidad=?';
    getDbPool().query(sql, [speciality], (err, results) => {
      resolve(results);
    });
  });
}

async function getUserbyGender(gender) {
  return new Promise(function(resolve, reject) {
    const sql = 'SELECT * FROM Usuario where genero=?';
    getDbPool().query(sql, [gender], (err, results) => {
      resolve(results);
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

