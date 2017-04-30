const express = require('express');
const http = require('http');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

//App Setup
app.use(morgan('combined')); //login request framework
app.use(bodyParser.json({ type: '*/*' })) //parser incoming request

//Server Setup
const port = process.env.PORT || 8090;

const server = http.createServer(app);
server.listen(port);
console.log('Server is listening on: ', port)