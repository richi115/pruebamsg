var config = require('../config/config');
var job = require('./models/job');
var msg = require('./models/mensaje');



exports.jobsync = function(active_jobs){
		for(i=0;i<active_jobs.length;i++){
			msg.count_msg(active_jobs[i].job},, function(err, result){
				if (err) {
					console.log('Error al actualizar cantidad en job:' + active_jobs[i].job);
				}
				else {
					active_jobs[i].Total_msg = result;
				}
			});
			
			msg.count({job: active_jobs[i].job, sta: 1}, function(err, result){
				if (err) {
					console.log('Error al actualizar enviados OK en job:' + active_jobs[i].job);
				}
				else {
					active_jobs[i].env_ok = result;
				}
			});

			msg.count({job: active_jobs[i].job, sta: 10}, function(err, result){
				if (err) {
					console.log('Error al actualizar err_dst en job:' + active_jobs[i].job);
				}
				else {
					active_jobs[i].err_dst = result;
				}
			});
			
			Cuando los trens hayan terminado (active_jobs[i].pend=active_jobs[i].total_msg - active_jobs[i].env_ok - active_jobs[i].err_dst)
		}
	}