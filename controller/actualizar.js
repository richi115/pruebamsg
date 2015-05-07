var msg = require('../models/mensaje');
var job = require('../models/job');



exports.actualizar_msg=function(mensajes,callback){
	var completadas=0
	var i=0
	var cant_msgs=mensajes.length
	if(cant_msgs){
		for(;i<cant_msgs;i++){
			msg.update_msg(mensajes[i],function(){
				completadas++
				if(completadas==cant_msgs){
					callback()
				}
			})
		}
	} else {
		callback()
	}
}


exports.actualizar_job=function(jobs,callback){
	var completadas=0
	var i=0
	var cant_jobs=jobs.length
	if(cant_jobs){
		for(;i<cant_jobs;i++){
			job.update_job(jobs[i],function(){
				completadas++
				if(completadas==cant_jobs){
					callback()
				}
			})
		}
	} else {
		callback()
	}
}
