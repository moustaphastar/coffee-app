require('dotenv').config();
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.render('index', { title: 'Express' });
});

module.exports = router;
