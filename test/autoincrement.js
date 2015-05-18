var job=require('../models/job')
var db = require('../db/db');

job.get_last_job(function(data){
	console.log('Ultimo job: ' +data)
})



