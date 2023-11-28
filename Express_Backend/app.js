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

app.get('/data/validateemail', (req, res)=>{
  console.log('req.query.username ',req.query.username);
  client.query(`Select COUNT(id) from users WHERE username = '${req.query.username}' `, (err, result)=>{
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
                        where username = '${req.body.username}' RETURNING *`

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
  // let queryString = req.query.grouporid.toString;
  client.query(`Select * from prayergroups WHERE groupname LIKE '%${req.query.grouporid}%' AND status = 'active' AND isprivategroup = false`, (err, result)=>{
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
  // let queryString = req.query.grouporid.toString;
  client.query(`Select * from prayergroups WHERE Id = '${req.query.grouporid}' AND status = 'active' AND isprivategroup = true`, (err, result)=>{
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
  client.query(`SELECT * FROM public.groupprayerrequests WHERE groupid = ${req.query.groupid} AND status = 'Praying'`, (err, result)=>{
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
  console.log('POST req.body.title',req.body.title);
  // console.log('POST req.body.scripture',req.body.scripture);
  // console.log('POST req.body.body',req.body.body);
  // console.log('POST req.body.userid',req.body.userid);
  let objectDate = new Date();

  let title = req.body.title;
  let scripture = req.body.scripture;
  let body = req.body.body;
  let userid = req.body.userid;
  let searchinput = req.body.searchinput;
  // let title = '"Embracing Divine Guidance"';
  // let scripture = '"But grow in the grace and knowledge of our Lord and Savior Jesus Christ. To him be glory both now and forever! Amen." - 2 Peter 3:18';
  // let body = 'Title: Embracing Divine Guidance\n' +
  // '\n' +
  // 'Scripture: "But grow in the grace and knowledge of our Lord and Savior Jesus Christ. To him be glory both now and forever! Amen." - 2 Peter 3:18\n' +
  // '\n' +
  // 'Devotional:\n' +
  // '\n' +
  // 'In our journey of faith, we often find ourselves seeking guidance and direction. We long to know the path we should take, the decisions we should make, and the purpose we should fulfill. In our quest for divine guidance, we must remember that it is through growing in the grace and knowledge of our Lord and Savior Jesus Christ that we find the answers we seek.\n' +
  // '\n' +
  // 'The Scripture in 2 Peter 3:18 reminds us of the importance of continuous growth in our relationship with Christ. It is not a one-time event, but rather a lifelong process of deepening our understanding and experiencing His grace. When we intentionally seek to know Him more, we position ourselves to receive divine guidance.\n' +
  // '\n' +
  // "To embrace divine guidance, we must first embrace God's grace. It is through His grace that we are forgiven, redeemed, and made new. We must acknowledge our need for His grace and surrender our lives to Him completely. As we do so, the Holy Spirit empowers us to walk in His ways and align our desires with His.\n" +
  // '\n' +
  // "Secondly, we must embrace the knowledge of our Lord and Savior Jesus Christ. This knowledge comes through reading, studying, and meditating on His Word. The Bible is the lamp that illuminates our path and reveals God's heart and will. As we immerse ourselves in the Scriptures, we gain wisdom, discernment, and understanding of His ways.\n" +
  // '\n' +
  // 'As we grow in grace and knowledge, we become more attuned to the voice of God. We recognize His leading and guidance in our lives. His still, small voice becomes clearer amidst the noise of the world. Through prayer and seeking His presence, we open ourselves to receive divine wisdom, direction, and comfort.\n' +
  // '\n' +
  // "Embracing divine guidance requires humility and trust. We must acknowledge that God's ways are higher than our ways and His thoughts are higher than our thoughts (Isaiah 55:9). We surrender our own plans and desires, trusting that His plan is perfect and His timing is flawless.\n" +
  // '\n' +
  // 'Let us commit ourselves to daily growth in the grace and knowledge of our Lord and Savior Jesus Christ. May we seek His guidance in all aspects of our lives, knowing that as we embrace His divine leading, we will experience His peace, purpose, and abundant blessings';

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
  let insertQuery = `insert into devotions(title, scripture, body, userid, devodate, searchinput) 
                     values('${replacedTitle}', '${replacedScripture}', '${replacedBody}', ${userid}, '${DateToSend}', '${replacedSearchInput}')`
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
  console.log('POST req.body.title',req.body.title);
  // console.log('POST req.body.scripture',req.body.scripture);
  // console.log('POST req.body.body',req.body.body);
  // console.log('POST req.body.userid',req.body.userid);
  let objectDate = new Date();

  let title = req.body.title;
  let scripture = req.body.scripture;
  let body = req.body.body;
  let userid = req.body.userid;
  let searchinput = req.body.searchinput;
  // let title = '"Embracing Divine Guidance"';
  // let scripture = '"But grow in the grace and knowledge of our Lord and Savior Jesus Christ. To him be glory both now and forever! Amen." - 2 Peter 3:18';
  // let body = 'Title: Embracing Divine Guidance\n' +
  // '\n' +
  // 'Scripture: "But grow in the grace and knowledge of our Lord and Savior Jesus Christ. To him be glory both now and forever! Amen." - 2 Peter 3:18\n' +
  // '\n' +
  // 'Devotional:\n' +
  // '\n' +
  // 'In our journey of faith, we often find ourselves seeking guidance and direction. We long to know the path we should take, the decisions we should make, and the purpose we should fulfill. In our quest for divine guidance, we must remember that it is through growing in the grace and knowledge of our Lord and Savior Jesus Christ that we find the answers we seek.\n' +
  // '\n' +
  // 'The Scripture in 2 Peter 3:18 reminds us of the importance of continuous growth in our relationship with Christ. It is not a one-time event, but rather a lifelong process of deepening our understanding and experiencing His grace. When we intentionally seek to know Him more, we position ourselves to receive divine guidance.\n' +
  // '\n' +
  // "To embrace divine guidance, we must first embrace God's grace. It is through His grace that we are forgiven, redeemed, and made new. We must acknowledge our need for His grace and surrender our lives to Him completely. As we do so, the Holy Spirit empowers us to walk in His ways and align our desires with His.\n" +
  // '\n' +
  // "Secondly, we must embrace the knowledge of our Lord and Savior Jesus Christ. This knowledge comes through reading, studying, and meditating on His Word. The Bible is the lamp that illuminates our path and reveals God's heart and will. As we immerse ourselves in the Scriptures, we gain wisdom, discernment, and understanding of His ways.\n" +
  // '\n' +
  // 'As we grow in grace and knowledge, we become more attuned to the voice of God. We recognize His leading and guidance in our lives. His still, small voice becomes clearer amidst the noise of the world. Through prayer and seeking His presence, we open ourselves to receive divine wisdom, direction, and comfort.\n' +
  // '\n' +
  // "Embracing divine guidance requires humility and trust. We must acknowledge that God's ways are higher than our ways and His thoughts are higher than our thoughts (Isaiah 55:9). We surrender our own plans and desires, trusting that His plan is perfect and His timing is flawless.\n" +
  // '\n' +
  // 'Let us commit ourselves to daily growth in the grace and knowledge of our Lord and Savior Jesus Christ. May we seek His guidance in all aspects of our lives, knowing that as we embrace His divine leading, we will experience His peace, purpose, and abundant blessings';

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
  let insertQuery = `insert into familydevotions(title, scripture, body, userid, devodate, searchinput) 
                     values('${replacedTitle}', '${replacedScripture}', '${replacedBody}', ${userid}, '${DateToSend}', '${replacedSearchInput}')`
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
  let groupNameRefined = req.body.groupname.replaceAll("'","''");

  let insertQuery = `insert into prayergroups(groupname, createdbyid, status, isprivategroup) 
                     values('${groupNameRefined}', '${req.body.submittedbyuserid}', '${req.body.status}', '${req.body.isprivate}') RETURNING id`
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

  let nameRefined = req.body.nama.replaceAll("'","''");
  let detailsRefined = req.body.details.replaceAll("'","''");

  let insertQuery = `insert into prayerrequests(nama, details, createdat, updatedat, status, timesprayed, submittedbyuserid) 
                     values('${nameRefined}', '${detailsRefined}', '${DateToSend}', '${DateToSend}', '${req.body.status}', 0, '${req.body.submittedbyuserid}' )`
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

app.post('/data/addGroupRequest', (req, res)=>{
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

  let nameRefined = req.body.nama.replaceAll("'","''");
  let detailsRefined = req.body.details.replaceAll("'","''");

  let insertQuery = `insert into groupprayerrequests(nama, details, createdat, updatedat, status, timesprayed, submittedbyuserid, groupid) 
                     values('${nameRefined}', '${detailsRefined}', '${DateToSend}', '${DateToSend}', '${req.body.status}', 0, '${req.body.submittedbyuserid}',  '${req.body.groupid}' )`
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
      console.log('PUT TIMESPRAYED SUCCESS', result)
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
// app.listen(3210, ()=>{
//   console.log('Server @port 3210 gan!')
// })



///for my phone
app.listen(3210, ()=>{
  console.log('Server @port 3210 gan!')
})


///for expo on computer
// app.listen(8082, ()=>{
//   console.log('Server @port 8082 gan!')
// })