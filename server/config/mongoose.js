var mongoose = require('mongoose');
var path = require('path');
var models_path = path.join(__dirname + './../models');
var fs = require('fs');

mongoose.connect('mongodb://localhost/tripCalculatorDB');


fs.readdirSync(models_path).forEach(function(file){
    if(file.indexOf('.js') >= 0){
        require(models_path + '/' + file);
    }
})
