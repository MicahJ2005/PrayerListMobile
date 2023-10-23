const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize('postgres://postgres:JjMj2011@localhost:5432/dojo');
const sequelize = new Sequelize('dojo', 'postgres', 'JjMj2011', {
  host: 'localhost',
  dialect: 'postgres'
})
// const sequelize = new Sequelize({
//   username: 'postgres',
//   host: 'localhost',
//   database: 'dojo',
//   password: 'JjMj2011',
//   dialect: 'postgres',
//   define: {
//     timestamps: false,
//   },
//   // operatorsAliases: false,
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   },

// });

// app.use(sequelize);

// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

const Ninja = sequelize.define('ninja', {
    nama: {type: Sequelize.STRING},
    usia: {type: Sequelize.INTEGER}
  });

// Ninja.sync({force: false}).then(() => {
//     console.log('Tabel dibuat!')
//   });

app.get('/data', function(req,res){
  Ninja.findAll().then(data => {
    console.log(data);
    res.send(data);
    // res.json({ message: "Welcome to bezkoder application." });
  })
})

app.post('/data', function(req,res){
    console.log('POST req', req);
Ninja.create({
    nama: req.body.nama,
    usia: req.body.usia
}).then(data => {
  console.log('Data masuk!');
  res.send({
		status: 'Data sukses diinput!',
		nama: req.body.nama,
		usia: req.body.usia
  })
});
})

sequelize.authenticate()
  .then(() => {
    console.log('Successfully authenticated to PostgreSQL');
  })
  .catch(err => {
    console.error('Issue authenticating SPostgreSQL:', err);
  });

app.listen(3210, ()=>{
  console.log('Server @port 3210 gan!')
})