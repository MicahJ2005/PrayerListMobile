const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const {Client} = require('pg');
const axios = require('axios');  
// const apiKey = '';
// const { Configuration, OpenAIApi } = require('openai');
// const configuration = new Configuration({
//     organization: "",
//     apiKey: apiKey
// });
// const openai = new OpenAIApi(configuration);
// const response = openai.listEngines();
// console.log('AI response', response);
// const apiKey = process.env.OPENAI_API_KEY;
// const apiKey = '';
// const aiClient = axios.create({
//     headers: { 'Authorization': 'Bearer ' + apiKey,
//                'Content-Type': 'application/json'
//               }
// });




// import { Configuration, OpenAIApi } from "openai";
// const configuration = new Configuration({
//     organization: "",
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

app.get('/data/signIn', (req, res)=>{
  console.log('req.query.username ',req.query.username);
  console.log('req.query.password',req.query.password);
  client.query(`Select * from users WHERE username = '${req.query.username}' AND password = '${req.query.password}' `, (err, result)=>{
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

app.get('/data/searchPrayerGroups', (req, res)=>{
  console.log('searchPrayerGroups group', req.query.grouporid)
  // let queryString = req.query.grouporid.toString;
  client.query(`Select * from prayergroups WHERE groupname LIKE '%${req.query.grouporid}%' AND status = 'active'`, (err, result)=>{
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

app.get('/data/prayergroups', (req, res)=>{
  console.log('req.query.userId ',req.query.userId);
  // console.log('req.query.password',req.query.password);
  client.query(`SELECT * FROM public.groupstousersjunction gtuj JOIN prayergroups pg ON gtuj.groupid = pg.id WHERE userid = ${req.query.userId} AND pg.status = 'active'`, (err, result)=>{
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

app.get('/data/groupprayerrequests', (req, res)=>{
  console.log('req.query.userId ',req.query.groupid);
  // console.log('req.query.password',req.query.password);
  client.query(`SELECT * FROM public.groupprayerrequests WHERE groupid = ${req.query.groupid}`, (err, result)=>{
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

app.get('/data', (req, res)=>{
  console.log('req.body',req.body);
  console.log('req.query.userId ',req.query.userId);
  client.query(`Select * from prayerrequests WHERE status = 'Praying' AND submittedbyuserid = ${req.query.userId} ORDER BY nama ASC `, (err, result)=>{
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
  console.log('req.query.userId ',req.query.userId);
  client.query(`Select * from prayerrequests WHERE status = 'Answered' AND submittedbyuserid = ${req.query.userId} ORDER BY nama ASC `, (err, result)=>{
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

app.get('/data/aiDevoDB', (req, res)=>{
  console.log('aiDevo req.body',req.body);
  client.query(`Select * from devotions`, (err, result)=>{
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

app.get('/data/checktodaysdevo', (req, res)=>{
  console.log('aiDevo req.body',req.body);
  console.log('req.query.userId ',req.query.userid);
  let objectDate = new Date();


  let day = objectDate.getDate();
  console.log(day); // 23

  let month = objectDate.getMonth() + 1;
  console.log(month + 1); // 8

  let year = objectDate.getFullYear();
  console.log(year); // 2022

  let DateToSend = year+'-'+month+'-'+day;
  console.log("DateToSend", DateToSend);
  client.query(`Select * from devotions WHERE userid = ${req.query.userid} AND devodate = '${DateToSend}'`, (err, result)=>{
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

app.post('/data/postdailydevo', (req, res)=>{
  console.log('POST req.body',req.body);
  console.log('POST req.body.title',req.body.title);
  console.log('POST req.body.scripture',req.body.scripture);
  console.log('POST req.body.body',req.body.body);
  console.log('POST req.body.userid',req.body.userid);
  let objectDate = new Date();


  let day = objectDate.getDate();
  console.log(day); // 23

  let month = objectDate.getMonth() + 1;
  console.log(month + 1); // 8

  let year = objectDate.getFullYear();
  console.log(year); // 2022

  let DateToSend = year+'-'+month+'-'+day;
  console.log("DateToSend", DateToSend);
  let insertQuery = `insert into devotions(title, scripture, body, userid, devodate) 
                     values('${req.body.title}', '${req.body.scripture}', '${req.body.body}', ${req.body.userid}, '${DateToSend}')`
    client.query(insertQuery, (err, result)=>{
        if(!err){
          console.log('POST SUCCESS', result)
            res.send('Insertion was successful')
        }
        else{ console.log('ERROR', err.message) }
    })
    client.end;
})

app.post('/data/newGroup', (req, res)=>{
  console.log('POST req.body',req.body);
  // console.log('POST req.body.title',req.body.title);
  // console.log('POST req.body.scripture',req.body.scripture);
  // console.log('POST req.body.body',req.body.body);
  // console.log('POST req.body.userid',req.body.userid);
  // let objectDate = new Date();


  // let day = objectDate.getDate();
  // console.log(day); // 23

  // let month = objectDate.getMonth() + 1;
  // console.log(month + 1); // 8

  // let year = objectDate.getFullYear();
  // console.log(year); // 2022

  // let DateToSend = year+'-'+month+'-'+day;
  // console.log("DateToSend", DateToSend);
  /// INSERT INTO prayergroups
  let insertQuery = `insert into prayergroups(groupname, createdbyid, status) 
                     values('${req.body.groupname}', '${req.body.submittedbyuserid}', '${req.body.status}') RETURNING id`
    client.query(insertQuery, (err, result)=>{
        if(!err){
          console.log('POST SUCCESS id', result.rows[0].id)
            // res.send('Insertion was successful')
            let insertQuery2 = `insert into groupstousersjunction(groupid, userid) 
                                values('${ result.rows[0].id}', '${req.body.submittedbyuserid}') RETURNING id`
            client.query(insertQuery2, (err, result2) => {
                if(!err){
                  console.log('POST SUCCESS', result2)
                    res.send('Insertion was successful')
                }
                else{ console.log('ERROR', err.message) }
            })
        }
        else{ console.log('ERROR', err.message) }
    })

    ////INSERT into junction table
    
    client.end;
})

app.post('/data/joinPrayerGroup', (req, res)=>{
  console.log('POST req.body',req.body);
  let insertQuery = `insert into groupstousersjunction(groupid, userid) 
                     values('${req.body.groupid}', '${req.body.userid}')`
    client.query(insertQuery, (err, result)=>{
        if(!err){
          // console.log('POST SUCCESS id', result.rows[0].id)
          res.send('Insertion was successful')
            
        }
        else{ console.log('ERROR', err.message) }
    })

    ////INSERT into junction table
    
    client.end;
})

app.post('/data', (req, res)=>{
  console.log('POST req.body',req.body);
  let objectDate = new Date();


  let day = objectDate.getDate();
  console.log(day); // 23

  let month = objectDate.getMonth() + 1;
  console.log(month + 1); // 8

  let year = objectDate.getFullYear();
  console.log(year); // 2022

  let DateToSend = year+'-'+month+'-'+day;
  console.log("DateToSend", DateToSend);
  let insertQuery = `insert into prayerrequests(nama, details, createdat, updatedat, status, timesprayed, submittedbyuserid) 
                     values('${req.body.nama}', '${req.body.details}', '${DateToSend}', '${DateToSend}', '${req.body.status}', 0, '${req.body.submittedbyuserid}' )`
    client.query(insertQuery, (err, result)=>{
        if(!err){
          console.log('POST SUCCESS', result)
            res.send('Insertion was successful')
        }
        else{ console.log('ERROR', err.message) }
    })
    client.end;
})

///CHANGE THIS TO A PUT WITH A NEW STATUS
// app.delete('/data', (req, res)=>{
//   console.log('DELETE req.body',req.body);
//   client.query(`delete from prayerrequests where id=${req.body.id}`, (err, result)=>{
//       if(!err){
//         console.log('DELETE result.rows', result);
//           res.send(result);
//       }
//       if(err){
//         console.log('err', err);
//     }
//   });
//   client.end;
// })

///USE THIS TO REPLACE THE ABOVE DELETE FUNCTION
app.put('/data/removePrayerRequest', (req, res)=>{
  console.log('PUT update to INACTIVE request req.body',req.body);
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
                        status = 'inactive'
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

app.put('/data', (req, res)=>{
  console.log('PUT req.body',req.body);
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

app.put('/data/timesprayedgroup', (req, res)=>{
  console.log('PUT timesprayedgroup req.body',req.body);
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
    let insertQuery = `update groupprayerrequests 
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

app.put('/data/deativateprayergroup', (req, res)=>{
  console.log('PUT deativateprayergroup req.body',req.body.groupid);
  // let objectDate = new Date();


  // let day = objectDate.getDate();
  // console.log(day); // 23

  // let month = objectDate.getMonth() + 1;
  // console.log(month + 1); // 8

  // let year = objectDate.getFullYear();
  // console.log(year); // 2022

  // let DateToSend = year+'-'+month+'-'+day;
  // console.log("DateToSend", DateToSend);
  if(req.body.groupid != null){
    let insertQuery = `update prayergroups 
                        set 
                        status = 'inactive'
                        where id = '${req.body.groupid}'`

    client.query(insertQuery, (err, result)=>{
    if(!err){
      console.log('PUT deativateprayergroup SUCCESS', result)
      res.send('update was successful')
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
///for my phone
app.listen(3210, ()=>{
  console.log('Server @port 3210 gan!')
})

///for expo on computer
// app.listen(8082, ()=>{
//   console.log('Server @port 8082 gan!')
// })