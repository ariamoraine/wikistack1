const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const bodyParser = require('body-parser');

var app = express();

app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next){
  res.render('index');
});

app.listen(3000, function(){
  console.log('server is listeing on port 3000');
});
