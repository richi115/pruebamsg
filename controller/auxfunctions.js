var config = require('../config/config');
var job = require('../models/job');
var msg = require('../models/mensaje');

var active_jobs = new Array();

exports.jobsync = function(active_jobs){
		console.log(active_jobs[2].job);
/*		for(i=0;i<active_jobs.length;i++){
			msg.count_msg_total(active_jobs[i].job,function(err, result){
				if (err) {
					console.log('Error al actualizar cantidad total de mensajes en job:' + active_jobs[i].job);
				}
				else {
					active_jobs[i].total_msg = result;
				}
			});
			
			msg.count_msg_status(active_jobs[i].job,10, function(err, result){
				if (err) {
					console.log('Error al actualizar enviados OK en job:' + active_jobs[i].job);
				}
				else {
					active_jobs[i].env_ok = result;
				}
			});

			msg.count_msg_status(active_jobs[i].job,13, function(err, result){
				if (err) {
					console.log('Error al actualizar err_dst en job:' + active_jobs[i].job);
				}
				else {
					active_jobs[i].err_dst = result;
				}
			});
			
			msg.count_msg_status(active_jobs[i].job,1, function(err, result){
				if (err) {
					console.log('Error al actualizar pendientes en job:' + active_jobs[i].job);
				}
				else {
					active_jobs[i].err_dst = result;
				}
			});
			
		} 
		*/
	}