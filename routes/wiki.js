const express = require('express');
const router = express.Router();

router.get('/add', function (req, res, next) {
  res.render('addpage');
});

router.get('/', function (req, res, next) {
  res.redirect('/');
});

router.post('/', function (req, res, next) {
  res.send("I am a post");
});



module.exports = router;
