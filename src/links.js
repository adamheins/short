'use strict';


const fs = require('fs');
const yaml = require('js-yaml');


let links = {};


module.exports.load = function(filePath) {
    links = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
};


module.exports.get = function(key) {
    return links[key];
};
