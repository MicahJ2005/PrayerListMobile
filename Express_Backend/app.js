const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const {Client} = require('pg')
// const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize('postgres://postgres:JjMj2011@localhost:5432/dojo');
// const sequelize = new Sequelize('dojo', 'postgres', 'JjMj2011', {
//   host: 'localhost',
//   dialect: 'postgres'
// })


const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "JjMj2011",
  database: "dojo"
})
client.connect();

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

app.get('/data', (req, res)=>{
  console.log('req.body',req.body);
  client.query(`Select * from prayerrequests WHERE status = 'Praying' ORDER BY nama ASC `, (err, result)=>{
      if(!err){
        console.log('result.rows', result.rows);
          res.send(result.rows);
      }
      if(err){
        console.log('err', err);
    }
  });
  client.end;
})

app.post('/data', (req, res)=>{
  console.log('POST req.body',req.body);
  let objectDate = new Date();


  let day = objectDate.getDate();
  console.log(day); // 23

  let month = objectDate.getMonth();
  console.log(month + 1); // 8

  let year = objectDate.getFullYear();
  console.log(year); // 2022
  // var UTCseconds = (x.getTime() + x.getTimezoneOffset()*60*1000)/1000;
  let DateToSend = year+'-'+month+'-'+day;
  console.log("DateToSend", DateToSend);
  let insertQuery = `insert into prayerrequests(nama, details, createdat, updatedat, status, timesprayed) 
                     values('${req.body.nama}', '${req.body.details}', '${DateToSend}', '${DateToSend}', '${req.body.status}', 0 )`
    client.query(insertQuery, (err, result)=>{
        if(!err){
          console.log('POST SUCCESS', result)
            res.send('Insertion was successful')
        }
        else{ console.log('ERROR', err.message) }
    })
    client.end;
})

app.delete('/data', (req, res)=>{
  console.log('DELETE req.body',req.body);
  client.query(`delete from prayerrequests where id=${req.body.id}`, (err, result)=>{
      if(!err){
        console.log('DELETE result.rows', result);
          res.send(result);
      }
      if(err){
        console.log('err', err);
    }
  });
  client.end;
})

app.put('/data', (req, res)=>{
  console.log('PUT req.body',req.body);
  let objectDate = new Date();


  let day = objectDate.getDate();
  console.log(day); // 23

  let month = objectDate.getMonth();
  console.log(month + 1); // 8

  let year = objectDate.getFullYear();
  console.log(year); // 2022
  // var UTCseconds = (x.getTime() + x.getTimezoneOffset()*60*1000)/1000;
  let DateToSend = year+'-'+month+'-'+day;
  console.log("DateToSend", DateToSend);
  if(req.body.id != null){
    let insertQuery = `update prayerrequests 
                        set 
                        nama = '${req.body.nama}',
                        details = '${req.body.details}',
                        updatedat = '${DateToSend}',
                        status = 'Praying'
                        where id = '${req.body.id}'`

    client.query(insertQuery, (err, result)=>{
    if(!err){
      console.log('PUT SUCCESS', result)
      res.send('Insertion was successful')
    }
      else{ console.log('ERROR', err.message) }
    })
    client.end;
  }
  else{ console.log('ERROR', err.message) }
  
})

app.put('/data/timesprayed', (req, res)=>{
  console.log('PUT timesprayed req.body',req.body);
  let objectDate = new Date();


  let day = objectDate.getDate();
  console.log(day); // 23

  let month = objectDate.getMonth();
  console.log(month + 1); // 8

  let year = objectDate.getFullYear();
  console.log(year); // 2022
  // var UTCseconds = (x.getTime() + x.getTimezoneOffset()*60*1000)/1000;
  let DateToSend = year+'-'+month+'-'+day;
  console.log("DateToSend", DateToSend);
  if(req.body.id != null){
    let insertQuery = `update prayerrequests 
                        set 
                        updatedat = '${DateToSend}',
                        timesprayed = '${req.body.timesprayed}'
                        where id = '${req.body.id}'`

    client.query(insertQuery, (err, result)=>{
    if(!err){
      console.log('PUT TIMESPRAYED SUCCESS', result)
      res.send('Insertion was successful')
    }
      else{ console.log('ERROR', err.message) }
    })
    client.end;
  }
  else{ console.log('ERROR', err.message) }
  
})
// const Ninja = sequelize.define('ninja', {
//     nama: {type: Sequelize.STRING},
//     usia: {type: Sequelize.INTEGER}
//   });

// Ninja.sync({force: false}).then(() => {
//     console.log('Tabel dibuat!')
//   });

// app.get('/data', function(req,res){
//   Ninja.findAll().then(data => {
//     console.log(data);
//     res.send(data);
//     // res.json({ message: "Welcome to bezkoder application." });
//   })
// })



// app.post('/data', function(req,res){
//     console.log('POST req', req);
// Ninja.create({
//     nama: req.body.nama,
//     usia: req.body.usia
// }).then(data => {
//   console.log('Data masuk!');
//   res.send({
// 		status: 'Data sukses diinput!',
// 		nama: req.body.nama,
// 		usia: req.body.usia
//   })
// });
// })

// sequelize.authenticate()
//   .then(() => {
//     console.log('Successfully authenticated to PostgreSQL');
//   })
//   .catch(err => {
//     console.error('Issue authenticating SPostgreSQL:', err);
//   });

app.listen(3210, ()=>{
  console.log('Server @port 3210 gan!')
})