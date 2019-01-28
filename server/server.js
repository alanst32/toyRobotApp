/**
 * Created by alanterriaga
 */
var express         = require('express');
var router        = require('./routes/routes.js');
var path            = require('path');
var app             = express();
var bodyParser    = require('body-parser');
var methodOverride 	= require('method-override');
var cookieParser 	= require('cookie-parser');

//==================================================================================
// Setting the applicatoin

app.use(express.static(path.join(__dirname, '../client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));

var port = 3000

app.listen(port, function() {
    console.log('running at localhost: ' + port);
});

module.exports=app;