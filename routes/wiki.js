const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/add', function (req, res, next) {
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next){

  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(results) {
      res.render('wikipage', {results});
  })
  .catch(function(next){
  });

});

router.get('/', function (req, res, next) {
  res.redirect('/');
});

router.post('/', function (req, res, next) {

  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  page.save()
    .then(function () {
      res.redirect(page.route);
    });
});


module.exports = router;
