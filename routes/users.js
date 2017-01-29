const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;
module.exports = router;

router.get('/', function (req, res, next) {
  User.findAll({})
  .then(function(allUsers) {
    res.render('users', {allUsers});
  })
  .catch(next);
});

router.get('/:id', function (req, res, next) {

  var userPromise = User.findById(req.params.id);

  var pagesPromise = Page.findAll({
    where: {
      authorId: req.params.id
    }
  });

  Promise.all([userPromise, pagesPromise])
  .then(function (values) {
    console.log(values);
    const user = values[0];
    const pages = values[1];
    res.render('userPage', {user: user, pages: pages});
  })
  .catch(next);
  });

//   Page.findAll({
//     where: {
//       authorId: req.params.id
//     }
//   })
//   .then(function (allPages) {
//     res.render('index', {allPages});
//   })
//   .catch(next);
// });

