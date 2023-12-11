const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const {Client} = require('pg');
const axios = require('axios'); 
require('dotenv').config();
// const dbConfig = require("../connectdb/config/db.config.js");

// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   // declaring pool is optional
//   // pool: {
// //   max: dbConfig.pool.max,
// //   min: dbConfig.pool.min,
// //   acquire: dbConfig.pool.acquire,
// //   idle: dbConfig.pool.idle
// // }
// });

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // db.blog = require("./blog.model.js")(sequelize, Sequelize);

// module.exports = db; 
// const client = new Client({
//   host: "localhost",
//   user: "postgres",
//   port: 5432,
//   password: "JjMj2011",
//   database: "dojo"
// })
// client.connect();

const DATABASE_URL2 = process.env;
console.log('DATABASE_URL2: ' , DATABASE_URL2);
const DATABASE_URL = "postgresql://micah:VqI83odLC98QwcCQAiHgug@devo-app-cluster-12913.7tt.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full";
const client = new Client(DATABASE_URL);

(async () => {
  await client.connect();
  try {
    const results = await client.query("SELECT NOW()");
    console.log('Successully connected to Database at: ',results);
  } catch (err) {
    console.error("error connecting to database:", err);
  } finally {
    // client.end();
  }
})();

// const Sequelize = require("sequelize");

app.get('/data/signIn', (req, res)=>{
  console.log('req.query.username ',req.query.username);
  console.log('req.query.password',req.query.password);
  client.query(`SELECT * FROM users WHERE username = '${req.query.username}' AND password = '${req.query.password}' AND active = true`, (err, result)=>{
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

app.get('/data/validateemail', (req, res)=>{
  console.log('req.query.username ',req.query.username);
  client.query(`Select * from users WHERE username = '${req.query.username}' AND active = 'true' `, (err, result)=>{
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

app.put('/data/setnewpassword', (req, res)=>{
  console.log('req.body.username ',req.body.username);
  console.log('req.querbodyy.password ',req.body.password);
  
  if(req.body.username != null){
    let insertQuery = `update users 
                        set 
                        password = '${req.body.password}'
                        where username = '${req.body.username}' AND active = true RETURNING *`

    client.query(insertQuery, (err, result)=>{
    if(!err){
      console.log('PUT setnewpassword SUCCESS', result)
      res.send(insertQuery)
    }
      else{ console.log('ERROR', err.message) }
    })
    client.end;
  }
  else{ console.log('ERROR', err.message) }
  
})

app.get('/data/searchPrayerGroups', (req, res)=>{
  console.log('searchPrayerGroups group', req.query.grouporid)
  client.query(`Select * from prayergroups WHERE groupname LIKE '%${req.query.grouporid}%' AND status = 'active' AND isprivategroup = false ORDER BY groupname ASC`, (err, result)=>{
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

app.get('/data/searchPrivatePrayerGroups', (req, res)=>{
  console.log('searchPrivatePrayerGroups group', req.query.grouporid)
  client.query(`Select * from prayergroups WHERE Id = '${req.query.grouporid}' AND status = 'active' AND isprivategroup = true ORDER BY groupname ASC`, (err, result)=>{
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
  client.query(`SELECT * FROM public.groupstousersjunction gtuj JOIN prayergroups pg ON gtuj.groupid = pg.id WHERE userid = ${req.query.userId} AND pg.status = 'active' ORDER BY pg.groupname ASC`, (err, result)=>{
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
  client.query(`SELECT * FROM public.groupprayerrequests WHERE groupid = ${req.query.groupid} AND status = 'Praying' ORDER BY nama ASC`, (err, result)=>{
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

app.get('/data/devotionhistory', (req, res)=>{
  console.log('req.body',req.body);
  console.log('req.query.userId ',req.query.userId);
  client.query(`Select id, userid, devodate from devotions WHERE userid = ${req.query.userId} ORDER BY devodate DESC `, (err, result)=>{
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

app.get('/data/familydevotionhistory', (req, res)=>{
  console.log('req.body',req.body);
  console.log('req.query.userId ',req.query.userId);
  client.query(`Select id, userid, devodate from familydevotions WHERE userid = ${req.query.userId} ORDER BY devodate DESC `, (err, result)=>{
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


app.get('/data/getdevobyuseranddate', (req, res)=>{
  console.log('req.body',req.body);
  console.log('req.query.userId ',req.query.userId);
  console.log('req.query.devoid ',req.query.devoid);
  client.query(`Select * from devotions WHERE userid = ${req.query.userid} AND id = ${req.query.devoid} ORDER BY devodate DESC `, (err, result)=>{
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

app.get('/data/getfamilydevobyuseranddate', (req, res)=>{
  console.log('req.body',req.body);
  console.log('req.query.userId ',req.query.userId);
  console.log('req.query.devoid ',req.query.devoid);
  client.query(`Select * from familydevotions WHERE userid = ${req.query.userid} AND id = ${req.query.devoid} ORDER BY devodate DESC `, (err, result)=>{
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

app.get('/data/groupPrayerhistory', (req, res)=>{
  console.log('req.body',req.body);
  console.log('req.query.userId ',req.query.userId);
  
  client.query(`SELECT * FROM public.groupstousersjunction gtuj JOIN prayergroups pg ON gtuj.groupid = pg.id JOIN groupprayerrequests gpr ON gtuj.groupid = gpr.groupid WHERE gtuj.userid = ${req.query.userId} AND gpr.status = 'Answered' ORDER BY nama ASC `, (err, result)=>{
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

  app.get('/data/checktodaysfamilydevo', (req, res)=>{
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
    client.query(`Select * from familydevotions WHERE userid = ${req.query.userid} AND devodate = '${DateToSend}'`, (err, result)=>{
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
  let randomId = Math.floor((Math.random() * 100000) + 1);
  let objectDate = new Date();

  let title = req.body.title;
  let scripture = req.body.scripture;
  let body = req.body.body;
  let userid = req.body.userid;
  let searchinput = req.body.searchinput;
  let replacedBody = body.replaceAll("'","''")
  let replacedTitle = title.replaceAll("'","''")
  let replacedScripture = scripture.replaceAll("'","''")
  let replacedSearchInput = searchinput.replaceAll("'","''")

  let day = objectDate.getDate();
  console.log(day); // 23

  let month = objectDate.getMonth() + 1;
  console.log(month + 1); // 8

  let year = objectDate.getFullYear();
  console.log(year); // 2022

  let DateToSend = year+'-'+month+'-'+day;
  console.log("DateToSend", DateToSend);
  let insertQuery = `insert into devotions(id, title, scripture, body, userid, devodate, searchinput) 
                     values(${randomId},'${replacedTitle}', '${replacedScripture}', '${replacedBody}', ${userid}, '${DateToSend}', '${replacedSearchInput}')`
    client.query(insertQuery, (err, result)=>{
        if(!err){
          console.log('POST SUCCESS', result)
            res.send('Insertion was successful')
        }
        else{ console.log('ERROR', err.message) }
    })
    client.end;
})

app.post('/data/createnewaccount', (req, res)=>{
  console.log('POST createnewaccount req.body',req.body);
  let randomId = Math.floor((Math.random() * 100000) + 1);
  let objectDate = new Date();
  let day = objectDate.getDate();
  console.log(day); // 23

  let month = objectDate.getMonth() + 1;
  console.log(month + 1); // 8

  let year = objectDate.getFullYear();
  console.log(year); // 2022

  let DateToSend = year+'-'+month+'-'+day;
  console.log("DateToSend", DateToSend);
  let insertQuery = `insert into users(id, username, firstname, lastname, birthday, phone, password, securityquestion, securityanswer, createddate, active) 
                     values(${randomId},'${req.body.registerEmailAddress}', '${req.body.registerFirstName}', '${req.body.registerLastName}', '${req.body.registerBirthdate}', '${req.body.registerPhone}', '${req.body.registerPassword}', '${req.body.registerSecurityQuestion}', '${req.body.registerSecurityAnswer}', '${DateToSend}', 'true')`
    client.query(insertQuery, (err, result)=>{
        if(!err){
          console.log('POST SUCCESS', result)
            res.send('Insertion was successful')
        }
        else{ console.log('ERROR', err.message) }
    })
    client.end;
})

app.post('/data/postdailyfamilydevo', (req, res)=>{
  console.log('POST req.body',req.body);
  let randomId = Math.floor((Math.random() * 100000) + 1);
  let objectDate = new Date();

  let title = req.body.title;
  let scripture = req.body.scripture;
  let body = req.body.body;
  let userid = req.body.userid;
  let searchinput = req.body.searchinput;
 
  let replacedBody = body.replaceAll("'","''")
  let replacedTitle = title.replaceAll("'","''")
  let replacedScripture = scripture.replaceAll("'","''")
  let replacedSearchInput = searchinput.replaceAll("'","''")

  let day = objectDate.getDate();
  console.log(day); // 23

  let month = objectDate.getMonth() + 1;
  console.log(month + 1); // 8

  let year = objectDate.getFullYear();
  console.log(year); // 2022

  let DateToSend = year+'-'+month+'-'+day;
  console.log("DateToSend", DateToSend);
  let insertQuery = `insert into familydevotions(id, title, scripture, body, userid, devodate, searchinput) 
                     values(${randomId},'${replacedTitle}', '${replacedScripture}', '${replacedBody}', ${userid}, '${DateToSend}', '${replacedSearchInput}')`
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
  let randomId = Math.floor((Math.random() * 100000) + 1);
  let groupNameRefined = req.body.groupname.replaceAll("'","''");

  let insertQuery = `insert into prayergroups(id, groupname, createdbyid, status, isprivategroup) 
                     values(${randomId}, '${groupNameRefined}', '${req.body.submittedbyuserid}', '${req.body.status}', '${req.body.isprivate}') RETURNING id`
    client.query(insertQuery, (err, result)=>{
        if(!err){
          console.log('POST SUCCESS id', result.rows[0].id)
            // res.send('Insertion was successful')
            let randomGroupId = Math.floor((Math.random() * 100000) + 1);
            let insertQuery2 = `insert into groupstousersjunction(id, groupid, userid) 
                                values(${randomGroupId},'${ result.rows[0].id}', '${req.body.submittedbyuserid}') RETURNING id`
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
  let randomId = Math.floor((Math.random() * 100000) + 1);
  let insertQuery = `insert into groupstousersjunction(id, groupid, userid) 
                     values(${randomId}',${req.body.groupid}', '${req.body.userid}')`
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

  let randomId = Math.floor((Math.random() * 100000) + 1);
  console.log('random id', randomId);
  let objectDate = new Date();


  let day = objectDate.getDate();
  console.log(day); // 23

  let month = objectDate.getMonth() + 1;
  console.log(month + 1); // 8

  let year = objectDate.getFullYear();
  console.log(year); // 2022

  let DateToSend = year+'-'+month+'-'+day;
  console.log("DateToSend", DateToSend);

  let nameRefined = req.body.nama.replaceAll("'","''");
  let detailsRefined = req.body.details.replaceAll("'","''");

  let insertQuery = `insert into prayerrequests(id, nama, details, createdat, updatedat, status, timesprayed, submittedbyuserid) 
                     values(${randomId},'${nameRefined}', '${detailsRefined}', '${DateToSend}', '${DateToSend}', '${req.body.status}', 0, '${req.body.submittedbyuserid}' )`
    client.query(insertQuery, (err, result)=>{
        if(!err){
          console.log('POST SUCCESS', result)
            res.send('Insertion was successful')
        }
        else{ console.log('ERROR', err.message) }
    })
    client.end;
})

app.put('/data/removeGroupPrayerRequest', (req, res)=>{
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
    let insertQuery = `update groupprayerrequests 
                        set 
                        updatedat = '${DateToSend}',
                        status = 'inactive'
                        where id = '${req.body.id}'`

    client.query(insertQuery, (err, result)=>{
    if(!err){
      console.log('PUT removeGroupPrayerRequest SUCCESS', result)
      res.send('Insertion was successful')
    }
      else{ console.log('ERROR', err.message) }
    })
    client.end;
  }
  else{ console.log('ERROR', err.message) }
  
})

app.delete('/data/removeUserFromGroup', (req, res)=>{
  console.log('DELETE req.body',req.body);
  client.query(`delete from groupstousersjunction where userid=${req.body.userid} AND groupid=${req.body.groupid}`, (err, result)=>{
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
      console.log('PUT removePrayerRequest SUCCESS', result)
      res.send('Insertion was successful')
    }
      else{ console.log('ERROR', err.message) }
    })
    client.end;
  }
  else{ console.log('ERROR', err.message) }
  
})

app.put('/data', (req, res)=>{
  console.log('PUT PRAYER REQUEST UPDATE req.body',req.body);
  let objectDate = new Date();


  let day = objectDate.getDate();
  console.log(day); // 23

  let month = objectDate.getMonth() + 1;
  console.log(month + 1); // 8

  let year = objectDate.getFullYear();
  console.log(year); // 2022

  let DateToSend = year+'-'+month+'-'+day;
  console.log("DateToSend", DateToSend);
  let refineddetails = req.body.details.replaceAll("'","''");
  let refinedname = req.body.nama.replaceAll("'","''");

  if(req.body.id != null){
    let insertQuery = `update prayerrequests 
                        set 
                        nama = '${refinedname}',
                        details = '${refineddetails}',
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

app.post('/data/addGroupRequest', (req, res)=>{
  console.log('POST req.body',req.body);
  let randomId = Math.floor((Math.random() * 100000) + 1);
  let objectDate = new Date();


  let day = objectDate.getDate();
  console.log(day); // 23

  let month = objectDate.getMonth() + 1;
  console.log(month + 1); // 8

  let year = objectDate.getFullYear();
  console.log(year); // 2022

  let DateToSend = year+'-'+month+'-'+day;
  console.log("DateToSend", DateToSend);

  let nameRefined = req.body.nama.replaceAll("'","''");
  let detailsRefined = req.body.details.replaceAll("'","''");

  let insertQuery = `insert into groupprayerrequests(id, nama, details, createdat, updatedat, status, timesprayed, submittedbyuserid, groupid) 
                     values(${randomId},'${nameRefined}', '${detailsRefined}', '${DateToSend}', '${DateToSend}', '${req.body.status}', 0, '${req.body.submittedbyuserid}',  '${req.body.groupid}' )`
    client.query(insertQuery, (err, result)=>{
        if(!err){
          console.log('POST SUCCESS', result)
            res.send('Insertion was successful')
        }
        else{ console.log('ERROR', err.message) }
    })
    client.end;
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
      console.log('PUT timesprayedgroup SUCCESS', result)
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

  let refinedNotes = req.body.answerednote.replaceAll("'","''");
  if(req.body.id != null){
    let insertQuery = `update prayerrequests 
                        set 
                        updatedat = '${DateToSend}',
                        status = '${req.body.status}',
                        answerednote = '${refinedNotes}'
                        where id = '${req.body.id}'`

    client.query(insertQuery, (err, result)=>{
    if(!err){
      console.log('PUT answeredprayer SUCCESS', result)
      res.send('Insertion was successful')
    }
      else{ console.log('ERROR', err.message) }
    })
    client.end;
  }
  else{ console.log('ERROR', err.message) }
  
})

app.put('/data/answeredgroupprayer', (req, res)=>{
  console.log('PUT answeredgroupprayer req.body',req.body);
  let objectDate = new Date();


  let day = objectDate.getDate();
  console.log(day); // 23

  let month = objectDate.getMonth() + 1;
  console.log(month + 1); // 8

  let year = objectDate.getFullYear();
  console.log(year); // 2022

  let DateToSend = year+'-'+month+'-'+day;
  console.log("DateToSend", DateToSend);

  let refinedNotes = req.body.answerednote.replaceAll("'","''");
  if(req.body.id != null){
    let insertQuery = `update groupprayerrequests 
                        set 
                        updatedat = '${DateToSend}',
                        status = '${req.body.status}',
                        answerednote = '${refinedNotes}'
                        where id = '${req.body.id}'`

    client.query(insertQuery, (err, result)=>{
    if(!err){
      console.log('PUT answeredgroupprayer SUCCESS', result)
      res.send('Insertion was successful')
    }
      else{ console.log('ERROR', err.message) }
    })
    client.end;
  }
  else{ console.log('ERROR', err.message) }
  
})

app.put('/data/updateGroupPrayerRequest', (req, res)=>{
  console.log('PUT answeredgroupprayer req.body',req.body);
  let objectDate = new Date();


  let day = objectDate.getDate();
  console.log(day); // 23

  let month = objectDate.getMonth() + 1;
  console.log(month + 1); // 8

  let year = objectDate.getFullYear();
  console.log(year); // 2022

  let DateToSend = year+'-'+month+'-'+day;
  console.log("DateToSend", DateToSend);

  let refineddetails = req.body.details.replaceAll("'","''");
  let refinedname = req.body.nama.replaceAll("'","''");
  if(req.body.id != null){
    let insertQuery = `update groupprayerrequests 
                        set 
                        nama = '${refinedname}',
                        details = '${refineddetails}',
                        updatedat = '${DateToSend}',
                        status = 'Praying'
                        where id = '${req.body.id}'`


    client.query(insertQuery, (err, result)=>{
    if(!err){
      console.log('PUT updateGroupPrayerRequest SUCCESS', result)
      res.send('Insertion was successful')
    }
      else{ console.log('ERROR', err.message) }
    })
    client.end;
  }
  else{ console.log('ERROR', err.message) }
  
})

// Serve static files
// app.use(express.static('build'));

const PORT = process.env.PORT || 3210;
///for my phone
app.listen(PORT, ()=>{
  // console.log('env PORT: ',process.env)
  console.log(`App listening on port: ${PORT}`)
})

module.exports = app;
///for expo on computer
// app.listen(8082, ()=>{
//   console.log('Server @port 8082 gan!')
// })