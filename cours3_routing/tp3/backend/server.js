const port = process.env.PORT || 3000

const http = require('http');
const app = require('./app');

// app.set('port', 3000);
const server = http.createServer(app);

server.listen(port,()=>{
    console.log(`Le server écoute sur http://127.0.0.1:${port}/`);
})