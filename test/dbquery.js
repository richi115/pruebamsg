var db = require('../db/db');
var job = require('../models/job');

while(true){
	job.load_job(function(){	
		console.log('jobs cargados')
	})	
}
