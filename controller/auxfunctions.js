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
	var largo=jobsque.length
	var ahora=parseInt(Date.now()/1000);
	var sobrante=0
	var msg_asignados=0
	var msg_total=0
	var faltante=0
	
	for(var i=0;i<largo;i++){
		acum=acum+ahora-jobsque[i].inicio
	}
	for(var i=0;i<largo;i++){
		msg_total=jobsque[i].total_msg				//total de mensajes del job
		msg_asignados=parseInt((ahora-jobsque[i].inicio)*totalmsg/acum)    //mensajes asignados a ese job
		if(msg_asignados>=msg_total){    //si hay mas asignados que el total
			jobsque[i].msg_a_enviar=msg_total	
			sobrante=sobrante+msg_asignados-msg_total
			jobsque[i].pasepor='asignados: '+msg_asignados+';sobrante: '+sobrante
		} else {
			faltante=msg_total-msg_asignados
			if(faltante<=sobrante){
				jobsque[i].msg_a_enviar=msg_total
				sobrante=sobrante-faltante
				jobsque[i].pasepor='asignados: '+msg_asignados+';faltante: '+faltante+';sobrante: '+sobrante
				} else {
				jobsque[i].msg_a_enviar=msg_asignados+sobrante
				sobrante=0
				jobsque[i].pasepor='asignados: '+msg_asignados+';faltante: '+faltante
			}
			
		}
		if(!jobsque[i].msg_a_enviar){
			jobsque.splice(i,1)
			i--
			largo--
		}
	}
	return jobsque
}