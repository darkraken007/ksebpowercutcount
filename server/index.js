const express = require('express');
const fetch = require('node-fetch');
const URLSearchParams = require('url');
const path = require('path'); 
const { get } = require('http');
const app = express();


const port = process.env.PORT || 80;
const DIST_DIR = path.join(__dirname, '../dist'); 
const HTML_FILE = path.join(DIST_DIR, 'main.html'); 





 


app.use(express.static(DIST_DIR));

const mockResponse = {
  foo: 'bar',
  bar: 'foo'
};

const encodeFormData = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
}
function checkAndSendResponse(data,res){
  if(data.message=="Record updated."){
    res.sendStatus(200);
  }
  else{
    res.sendStatus(403);
  }
}
function updateAndSend(data,count,res){
  var d = new Date();
  var body="";
  if(count==-1){
    body = {
      dailyCount: 0,
      monthlyCount:data[0].monthlyCount,
      yearlyCount:  data[0].yearlyCount,
      averageCountPerDay: data[0].averageCountPerDay,
      totalCount: data[0].totalCount
    }
  }
  else if(count==-9){
    body = {
      dailyCount: 0,
      monthlyCount:0,
      yearlyCount:0,
      averageCountPerDay:0,
      totalCount:0
    }
  }
  else if(count==-2){
    body = {
      dailyCount: data[0].dailyCount,
      monthlyCount: 0,
      yearlyCount: data[0].yearlyCount,
      averageCountPerDay: 0,
      totalCount: data[0].totalCount
    }
  }
  else if(count==-3){
    body = {
      dailyCount: data[0].dailyCount,
      monthlyCount: data[0].monthlyCount,
      yearlyCount: 0,
      averageCountPerDay: data[0].averageCountPerDay,
      totalCount: data[0].totalCount
    }
  }
  else{
    body = {
    dailyCount: data[0].dailyCount+count,
    monthlyCount: data[0].monthlyCount+count,
    yearlyCount: data[0].yearlyCount+count,
    averageCountPerDay: +(((data[0].monthlyCount+count)/d.getDate()).toFixed(2)),
    totalCount: data[0].totalCount+count
  }
}
  var url="https://jsonbox.io/box_e1bbe0030864cee81568/5f4a3c5d9b2b9c00179906df";
  const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json'
    }
  };

  fetch(url, requestOptions)
  .then(response=>response.json())
  .then(resJson=>checkAndSendResponse(resJson,res))
  .catch(error=>res.sendStatus(500))

}


app.get('/update', (req, res) => {
  var date = new Date();

  if(req.query.key==""||req.query.key==undefined){
    res.sendStatus(403);
  }
  else{
    if(req.query.key=="854317221"){
      if(req.query.count==""||req.query.count==undefined){
        res.sendStatus(403)
      }
      var count = parseInt(req.query.count);

      var url="https://jsonbox.io/box_e1bbe0030864cee81568";
      const requestOptions = {
            method: 'GET'
        };
   fetch(url, requestOptions)
   .then(response=>response.json())
   .then(data=>updateAndSend(data,count,res))
   .catch(error=>res.sendStatus(500))
    }

  }
});

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});

function sendPrunedJson(data,res){
  var pruned_json = {
    "dailyCount":data[0].dailyCount,
    "monthlyCount":data[0].monthlyCount,
    "yearlyCount":data[0].yearlyCount,
    "averageCountPerDay":data[0].averageCountPerDay,
    "totalCount":data[0].totalCount
  };
  res.send(pruned_json);
}


app.get('/getStat', (req, res) => {
  var url="https://jsonbox.io/box_e1bbe0030864cee81568";
    const requestOptions = {
        method: 'GET'
    };
    fetch(url, requestOptions)
    .then(response=>response.json())
    .then(data=>sendPrunedJson(data,res))
    .catch(error=>res.sendStatus(500))

});


app.listen(port, function () {
 console.log('App listening on port: ' + port);
});
