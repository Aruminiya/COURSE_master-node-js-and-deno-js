const fs = require('fs');

const requestHandler = (req, res) => {
  // console.log(req.url, req.method, req.headers);
  // res.end('Hello World');
  // process.exit();
  const url = req.url;
  const method = req.method;
  res.setHeader('Content-Type', 'text/html');
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  } else if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1]; // 假設表單數據是以 key=value 格式發送的
      // fs.writeFileSync('message.txt', message); // writeFileSync 是同步寫入，如果檔案很大，會阻塞主線程，導致伺服器無法處理其他請求
      fs.writeFile('message.txt', message, (err) => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          res.end();
          throw err;
        }
        res.statusCode = 302;
        res.setHeader('Location', '/'); // 重定向到主頁 這樣的設計可以改善用戶體驗，因為用戶在提交表單後會自動返回到主頁，而不會留在一個可能顯示空白頁面的 POST 路徑上。
        return res.end();
      }); // 建議使用 writeFile 是異步寫入，不會阻塞主線程，可以處理其他請求

    });
  } else {
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server</h1></body>');
    res.write('</html>');
    res.end();
  }
}

module.exports = requestHandler;