const app = require('./src/app');

var fs = require('fs');
var https = require('https');

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}, app)
.listen(3050, function () {
  console.log('Aapp listening on port 3050! Go to https://localhost:3050/')
});