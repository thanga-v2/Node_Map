const fs = require('node:fs');                      
// node:fs = same as require('fs') — modern explicit syntax - loads file system

const http = require('node:http');               

const index = fs.readFileSync('public/index.html');
// readFileSync = read file SYNCHRONOUSLY
// reads the entire file, WAITS until done, then continues
// this is the ONE time blocking is fine — happens once at startup
// stores the HTML content in memory — read ONCE, not on every request

const server = http.createServer((req, res) => {  
// raw Node.js HTTP server — same thing Express wraps under the hood
// callback fires on every incoming HTTP request

  res.setHeader('Content-Type', 'text/html');  
  // tells browser: the data I'm sending is HTML
  // without this — browser might treat it as plain text

  res.end(index);                                 
  // sends the HTML file and closes the response
  // every request to port 8080 gets the same index.html

});

server.listen(8080);                     
// HTTP server listens on port 8080
// WebSocket server is on port 3000
// two different servers, two different ports