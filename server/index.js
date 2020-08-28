const express = require('express');
const fetch = require('node-fetch');
const URLSearchParams = require('url');
const path = require('path'); 
const { get } = require('http');
const app = express();
var JsonDB = require("node-json-db").JsonDB;
var Config = require('node-json-db/dist/lib/JsonDBConfig').Config;
var cron = require('node-cron');

const port = process.env.PORT || 80;
const DIST_DIR = path.join(__dirname, '../dist'); 
const HTML_FILE = path.join(DIST_DIR, 'main.html'); 
const DB_FILE = path.join(__dirname, '../myDataBase.json'); 


var db = new JsonDB(new Config("myDataBase",true,false,'/'));

 
cron.schedule('* * 1 * *', () => {
  console.log('resetting monthly count');
  db.push("/monthlyCount",0);

});

cron.schedule('* 0 * * *', () => {
  console.log('resetting daily count');
  db.push('/dailyCount',0);
});

cron.schedule('* 0 * * *', () => {
  console.log('resetting yearly count');
  db.push('/yearlyCount',0);
});


app.use(express.static(DIST_DIR));

const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};



app.get('/update', (req, res) => {
  var date = new Date();

  if(req.query.key==""||req.query.key==undefined){
    res.sendStatus(200);
  }
  else{
    if(req.query.key=="854317221"){
      if(req.query.count==""||req.query.count==undefined){
        res.sendStatus(200)
      }
      var count = parseInt(req.query.count);
      var dailycount = db.getData("/dailyCount") | 0;
      var monthlycount = db.getData("/monthlyCount") | 0;
      var yearlycount = db.getData("/yearlyCount") | 0;
      var totalCount = db.getData('/totalCount') | 0;
      var averageCountPerDayThisMonth = db.getData("/averageCountPerDay") | 0;
      db.push("/dailyCount",dailycount+count);
      db.push("/monthlyCount",monthlycount+count);
      db.push("/yearlyCount",yearlycount+count);
      db.push("/totalCount",totalCount+count);
      db.push("/averageCountPerDay",+(monthlycount/date.getDate()).toFixed(2));
    }
    res.sendStatus(200);

  }
});

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});

app.get('/getStat', (req, res) => {
  res.sendFile(DB_FILE);
});


app.get('/reset', (req, res) => {
  
  if(req.query.key==""||req.query.key==undefined){
    res.sendStatus(200);
  }
  else{
    if(req.query.key=="854317221"){
      db.push("/dailyCount",0);
      db.push("/monthlyCount",0);
      db.push("/yearlyCount",0);
      db.push("/totalCount",0);
      db.push("/averageCountPerDay",0);
    }}
    res.sendStatus(200);
  });

app.listen(port, function () {
 console.log('App listening on port: ' + port);
});
