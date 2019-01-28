/**
 * Created by alanterriaga on 27/10/18.
 */
var express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('index')
});
module.exports = router;