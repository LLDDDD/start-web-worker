const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
};

const server = http.createServer((request, response) => {
  console.log(`${request.method} ${request.url}`);

  let filePath = '.' + request.url;
  if (filePath === './helloworld/') {
    filePath = './helloworld/index.html';
  }

  const extname = path.extname(filePath);
  const mimeType = mimeTypes[extname] || 'text/plain';

  fs.readFile(filePath, (error, data) => {
    if (error) {
      if (error.code === 'ENOENT') {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('404 Not Found');
      } else {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end(`500 Internal Server Error\n${error.code}`);
      }
    } else {
      response.writeHead(200, { 'Content-Type': mimeType });
      response.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
