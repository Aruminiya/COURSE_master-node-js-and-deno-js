const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended: false})) // `body-parser` 是一個用於解析 HTTP 請求主體的中介軟體

app.use(shopRoutes);
app.use(adminRoutes);

// '/' 代表 ‘/’ 為開頭的路徑
app.use('/', (req, res, next) => {
  console.log('In the middleware');
  next();
});

app.use((req, res, next) => {
  console.log('In the second middleware!');
  next();
});

// 404 page
app.use((req, res, next) => {
  res.status(404);
  res.send('<h1>Page not found</h1>');
  next();
});

app.listen(3000);
