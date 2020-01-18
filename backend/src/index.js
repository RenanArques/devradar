const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');


const routes = require('./routes');
const { setupWebsocket } = require('./socketio');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://admin:Zg8jTWceopGuQAdR@cluster0-mju2r.gcp.mongodb.net/DevRadar?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);