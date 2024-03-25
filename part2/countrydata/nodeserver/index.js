import http from 'http';
const PORT = 3001;

const app =http.createServer((req, res) => {
  res.writeHead(200, {Content-Type: 'text/plain'});
  res.end('hello world!');
});

app.listen(PORT);
console.log(`Server started on port ${PORT} on: ${Date()}`);
