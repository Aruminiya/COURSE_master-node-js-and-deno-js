const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');

router.get('/add-product', (req, res, next) => {
  console.log('In another middleware!');
  const addProductPage = path.join(rootDir, 'views', 'add-product.html');
  res.sendFile(addProductPage);
});

router.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;