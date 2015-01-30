var config = require('./config/config');
var db = require('./db/db');
var mdm = require('./controller/gestionmdms');
var job = require('./models/job');
var async = require('async');
var msg = require('./models/mensaje');


var modems[]



while(true){
	async.series([
		function(callback){
			mdm.load_mdm(modems,function(){
				callback(null,'Cargados ' + modems.length + ' modem(s)')
		}
	
	
	])
	
	
}