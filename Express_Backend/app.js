const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const {Client} = require('pg')

// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//     organization: "org-hlM7EyHTWqKNPhsIcAIZpCzg",
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();
// console.log('AI Response: ', response);


const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "JjMj2011",
  database: "dojo"
})
client.connect();


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

app.get('/data/prayerhistory', (req, res)=>{
  console.log('req.body',req.body);
  client.query(`Select * from prayerrequests WHERE status = 'Answered' ORDER BY nama ASC `, (err, result)=>{
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

app.get('/data/aiDevo', (req, res)=>{
  console.log('aiDevo req.body',req.body);
  // client.query(`Select * from prayerrequests WHERE status = 'Answered' ORDER BY nama ASC `, (err, result)=>{
  //     if(!err){
  //       console.log('result.rows', result.rows);
  //         res.send(result.rows);
  //     }
  //     if(err){
  //       console.log('err', err);
  //   }
  // });
  // client.end;
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

  let month = objectDate.getMonth() + 1;
  console.log(month + 1); // 8

  let year = objectDate.getFullYear();
  console.log(year); // 2022

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

app.put('/data/answeredprayer', (req, res)=>{
  console.log('PUT answeredprayer req.body',req.body);
  let objectDate = new Date();


  let day = objectDate.getDate();
  console.log(day); // 23

  let month = objectDate.getMonth() + 1;
  console.log(month + 1); // 8

  let year = objectDate.getFullYear();
  console.log(year); // 2022

  let DateToSend = year+'-'+month+'-'+day;
  console.log("DateToSend", DateToSend);
  if(req.body.id != null){
    let insertQuery = `update prayerrequests 
                        set 
                        updatedat = '${DateToSend}',
                        status = '${req.body.status}',
                        answerednote = '${req.body.answerednote}'
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

app.listen(3210, ()=>{
  console.log('Server @port 3210 gan!')
})