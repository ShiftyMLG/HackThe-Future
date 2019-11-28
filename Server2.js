const https = require('https');
const http = require('http')

const hostname = '127.0.0.1';
const port = 3000;

let displaydata='';

https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).title);
    console.log();
    console.log(JSON.parse(data).explanation);
    displaydata = data;
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

const server = http.createServer(function(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.write(JSON.parse(displaydata).explanation);
    res.end('Hello World\n');
  });

  server.listen(port, hostname, function() {
    console.log('Server running at http://'+ hostname + ':' + port + '/');
    console.log(displaydata)
  });