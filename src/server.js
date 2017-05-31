'use strict';

let express = require('express');

let links = require('./links');
links.load('links.yaml');

let app = express();


app.get('/', (req, res) => {
  res.redirect('https://adamheins.com');
});


app.get('/:key', (req, res) => {
    let url = links.get(req.params.key);
    if (url) {
        res.redirect(url);
    } else {
       res.status(404).send('Not found.');
    }
});


app.get('/:key/*', (req, res) => {
    let remainderPath = req.originalUrl.substring(req.params.key.length + 1);
    let url = links.get(req.params.key);
    if (url) {
        res.redirect(url + remainderPath);
    } else {
        res.status(404).send('Not found.');
    }
});


app.listen(process.env.PORT);
