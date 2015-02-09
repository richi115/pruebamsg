var config = require('../config/config');
var job = require('../models/job');
var msg = require('../models/mensaje');
var async = require('async');


exports.jobsync = function(active_jobs,cbfinal){
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
					job.update_job_stats(results,cbfinal);
				}
			})
	}
}

exports.job_ponderar=function(jobsque,totalmsg){
	var acum=0
	var acum2=0
	var largo=jobsque.length
	var ahora=parseInt(Date.now()/1000);
	var sobrante=0
	
	for(var i=0;i<largo;i++){
		acum=acum+ahora-jobsque[i].inicio
	}
	for(var i=0;i<largo;i++){
		jobsque[i].msg_a_enviar=parseInt((ahora-jobsque[i].inicio)*totalmsg/acum)
		acum2=acum2+jobsque[i].msg_a_enviar
		if(!jobsque[i].msg_a_enviar){
			jobsque.splice(i,1)
			i--
			largo--
		}
	}
	sobrante=totalmsg-acum2
	jobsque[0].msg_a_enviar=jobsque[0].msg_a_enviar+sobrante
	return jobsque
}