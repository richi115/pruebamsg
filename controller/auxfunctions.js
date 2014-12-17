var config = require('../config/config');
var job = require('../models/job');
var msg = require('../models/mensaje');
var async = require('async');


exports.jobsync = function(active_jobs){
	for(i=0;i<active_jobs.length;i++){
		async.parallel({
			total: function(callback){
					msg.count_msg_total(active_jobs[i]._id,function(result){
						callback(null,result);
					});
				},
			enviados: function(callback){
					msg.count_msg_status(active_jobs[i]._id,10, function(result){
						callback(null,result);				
					});
				},
			error: function(callback){
					msg.count_msg_status(active_jobs[i]._id,13, function(result){
						callback(null,result);
					});
				},
			jobid: function(callback){
						callback(null,active_jobs[i]._id);
					},
			},
			function(err,results){
				if(err){
					console.log('Error al syncronizar job: ' + results.jobid)
				} else {
					job.update_job_stats(results);
				}
			})
	}
}

/*
exports.jobsync = function(active_jobs){
	for(job=0;job<active_jobs.length;job++){
		async.parallel([
			(function(i){
				msg.count_msg_total(active_jobs[i]._id,function(result){db.
					active_jobs[i].total_msg = result;
				});
				msg.count_msg_status(active_jobs[i]._id,10, function(result){
					active_jobs[i].env_ok = result;
				});

				msg.count_msg_status(active_jobs[i]._id,13, function(result){
					active_jobs[i].err_dst = result;
				});
			})(job)],
			function(){console.log('Listo: ' + i);})
	}
}*/