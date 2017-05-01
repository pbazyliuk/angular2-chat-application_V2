const express = require('express');
const http = require('http');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//DB Setup
mongoose.connect('mongodb://localhost:auth/auth');

//App Setup
app.use(cors());
app.use(morgan('combined')); //login request framework
app.use(bodyParser.json({ type: '*/*' })) //parser incoming request
router(app);

//Server Setup
const port = process.env.PORT || 8090;

const server = http.createServer(app);
server.listen(port);
console.log('Server is listening on: ', port)