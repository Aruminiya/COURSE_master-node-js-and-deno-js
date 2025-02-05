const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended: false})) // `body-parser` 是一個用於解析 HTTP 請求主體的中介軟體

// '/' 代表 ‘/’ 為開頭的路徑
app.use('/', (req, res, next) => {
  console.log('In the middleware');
  next();
});

app.use((req, res, next) => {
  console.log('In the second middleware!');
  next();
});

app.get('/add-product', (req, res, next) => {
  console.log('In another middleware!');
  res.send('<form action="/product" method="POST"><input type="text" name="title"/><button type="submit">Add Product</button></form>');
});

app.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

app.get('/', (req, res, next) => {
  console.log('In another middleware!');
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);
