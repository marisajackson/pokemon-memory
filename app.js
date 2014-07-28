var http = require('http');
var directory = 'public';
var port = process.env.PORT;
var less = require('express-less');

var express = require('express');
var app = express();

app.get('/', function(req, res) {
      res.sendfile('./public/index.html');
});
app.use(express.static(__dirname + '/public'));
app.use('/less', less(__dirname + '/less'));

http.createServer(app).listen(port, function(){
  console.log('Node server listening. Port: ' + port + ', Directory: ' + directory);
});
