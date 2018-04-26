var mongoose = require('mongoose');
var fs = require('fs');
//connect tothe database
//remember to change the database
mongoose.connect("mongodb://root:root@ds131989.mlab.com:31989/todo");

//load all model files
var models_path=__dirname+'/../models'
//for each file in the path
fs.readdirSync(models_path).forEach(function(file) {
    if (file.indexOf('.js')>0) {
        //load each model file
        require(models_path+'/'+file);
    }
}) 