const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('In another middleware!');
  console.log(__dirname);
  const shopPage = path.join(__dirname, '..', 'views', 'shop.html');
  res.sendFile(shopPage);
});

module.exports = router;