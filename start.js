//var config = require('./config/config');
var db = require('./db/db');
var modem = require('./models/modem');
var job = require('./models/job');
//var msg = require('./models/mensaje');


modem.find_mdm_lstuse(function(modemdata){
	console.log(modemdata);
});



