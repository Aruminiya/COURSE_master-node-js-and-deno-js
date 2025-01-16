const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  res.setHeader('Content-Type', 'text/html');
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Home Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server</h1></body>');
    res.write('</html>');
    return res.end();
  } else if (url === '/users' && method === 'GET') {
    res.write('<html>');
    res.write('<head><title>Users Page</title></head>');
    res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Create User</button></form></body>');
    res.write('</html>');
    return res.end();
  } else if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split('=')[1];
      fs.writeFile('users.txt', username, (err) => {
        if (err) {
          console.error(err);
          res.statusCode = 500;
          return res.end();
        }
        res.setHeader('Location', '/users');
        res.statusCode = 302;
        return res.end();
      });
    });
  } else {
    res.write('<html>');
    res.write('<head><title>404</title></head>');
    res.write('<body><h1>Page Not Found</h1></body>');
    res.write('</html>');
    return res.end();
  }
};

module.exports = requestHandler;