'use strict';

let fs = require('fs');
let yaml = require('js-yaml');


let links = {};


module.exports.load = function(filePath) {
     links = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
};


module.exports.get = function(key) {
    return links[key];
};
