const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const model = require('./models');
const Page = model.Page;
const User = model.User;
//const wikiRouter = require('./routes/wiki');
//const usersRouter = require('./routes/users');

var app = express();

app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/users'));

app.get('/', function(req, res, next){

  Page.findAll({
  })
  .then(function(allPages) {
    res.render('index', {allPages});
  })
  .catch(next);
  // res.render('index');
});


User.sync()
  .then(function() {
    return Page.sync();
  })
  .then(function() {
    app.listen(3000, function(){
      console.log('server is listeing on port 3000');
    });
  });
