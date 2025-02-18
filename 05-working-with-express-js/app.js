const express = require('express');
const path = require('path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended: false})) // `body-parser` 是一個用於解析 HTTP 請求主體的中介軟體

app.use(shopRoutes);
app.use('/admin', adminRoutes); // '過濾路徑 /admin' 代表 ‘/admin’ 為開頭的路徑 , 如果沒有填寫 代表以 '/' 為開頭的路徑

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
  const page404 = path.join(__dirname, 'views', '404.html');
  res.sendFile(page404);
});

app.listen(3000);
