const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path');

router.get('/', (req, res, next) => {
  console.log('In another middleware!');
  console.log(__dirname);
  const shopPage = path.join(rootDir, 'views', 'shop.html');
  res.sendFile(shopPage);
});

module.exports = router;