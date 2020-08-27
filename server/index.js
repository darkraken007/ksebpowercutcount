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



app.get('/api', (req, res) => {
  res.send(mockResponse);
});

app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});


app.listen(port, function () {
 console.log('App listening on port: ' + port);
});
