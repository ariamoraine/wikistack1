const express = require('express');
const wikiRouter = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;
module.exports = wikiRouter;

wikiRouter.get('/add', function (req, res, next) {
  res.render('addpage');
});

wikiRouter.get('/search/:tag', function (req, res, next) {
  Page.findByTag(req.params.tag)
  .then(function(allPages) {
    console.log(allPages);
    res.render('index', {
      allPages: allPages
    });
  })
  .catch(next);
});

wikiRouter.get('/:urlTitle', function (req, res, next){

  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    },
    include: [
      {model: User, as: 'author'}
    ]
  })
  .then(function(page) {

      if (page === null) {
        res.status(404).send();
      } else {
        res.render('wikipage', {
          page: page
        });
      }
  })
  .catch(function(next){
  });

});

wikiRouter.get('/', function (req, res, next) {
  res.redirect('/');
});

wikiRouter.post('/', function (req, res, next) {

  User.findOrCreate({
    where: {
      name: req.body.authorName,
      email: req.body.authorEmail
    }
  })
  .then(function (values) {

    var user = values[0];

    var page = Page.build({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags
    });

    return page.save().then(function (page) {
      return page.setAuthor(user);
    });

  })
  .then(function (page) {
    res.redirect(page.route);
  })
  .catch(next);
});

wikiRouter.get('/:urlTitle/similar', function (req, res, next) {
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
    .then(function (page) {
      return page.findSimilar();
    })
    .then(function (similarPages) {
      res.render('index', {
        allPages: similarPages
      });
    })
    .catch(next);
});
