const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const keys = require('./config/keys');
const mongoose = require('mongoose');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type:'*/*'}));

const router = require('./router')(app);

const port = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(port);

