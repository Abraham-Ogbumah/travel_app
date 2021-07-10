const dotenv = require("dotenv");
dotenv.config();

const path = require('path');
const express = require('express');
const https = require('https');
const fetch = require('node-fetch');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const geo_name = process.env.GEO_NAME;
const geo_key = process.env.GEO_KEY;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static('dist'));

const port = 8082;

const server = app.listen(port, listening);

function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

app.get('/', (rep, res) => {
    res.sendFile('dist/index.html');
});

app.get('/getData', (req, res) => {
    console.log(projectData);
    res.send(projectData);
});

let data = [];

app.post('/addWeather', (req, res) => {
    console.log(req.body);
    projectData = req.body;
    res.send(projectData);
});