var config = require('../config/config');
var job = require('../models/job');
var msg = require('../models/mensaje');

exports.jobsync = function(active_jobs){
	for(job=0;job<active_jobs.length;job++){
		(function(){
			var i=job;
			msg.count_msg_total(active_jobs[i]._id,function(result){
				console.log(result);
				active_jobs[i].total_msg = result;
			});
			msg.count_msg_status(active_jobs[i]._id,1, function(result){
				active_jobs[i].env_ok = result;
			});

			msg.count_msg_status(active_jobs[i]._id,13, function(result){
				active_jobs[i].err_dst = result;
			});
		})()
	}
}