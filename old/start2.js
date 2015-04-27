var config = require('./config/config');
var db = require('./db/db');
var mdm = require('./controller/gestionmdms');
var job = require('./models/job');
var async = require('async');
//var msg = require('./models/mensaje');


var next_job_reload=0;
var active_jobs = [];
var modems = [];

mdm.load_mdm(modems,function(){
		async.series([
			function(callback){
				if(active_jobs.length<config.JOB_SIM){
					actuallen=active_jobs.length;
					job.load_job(function(active_jobs){
						result = +config.JOB_SIM - +actuallen
						callback(null,'JOBS: Cargados '+ result + ' job(s)');
					})
				}
			}],
/*			function(callback){
				for(i=0;active_jobs.length<config.JOB_SIM;i++){
						async.waterfall([
							function(callbackl2){
								mdm.get_nxt_mdm(modems,function(modem){
									
								}
							}
						],
						})
						callback(null,0);
			}],
	*/		function(err,results){
				console.log(results[0])
			}
		)
	}
)




/*



msg.snd_nxt_msg(modem,active_job[i],function(){
								mdm.update_status()




while(true){
	async.series([
		function(callback){
			if(next_job_sync>config.JOB_SYNC) {
				ctrl.jobsync(active_jobs,function(data){ //Reescribe vars de estado de mensajes en los jobs activos
					next_job_sync=0;
					callback(null,'Jobs Sincronizados');
				)}
			} else {
				next_job_sync++;
				callback(null,'next_job_sync: ' + next_job_sync);
			}
		},
		function(callback){
			if(active_jobs.length<config.JOB_SIM || next_job_reload>config.JOB_RELOAD){
				job.load_job(function(active_jobs){
					next_job_reload=0;
					callback(null,next_job_reload);
				}
			
		},
	next_job_reload++;
	
	if(job_pointer>JOB_SIM-1){				//si el puntero se fue del array de jobs volver al principio
		job_pointer=0;
	}
		
	if(!active_jobs[job_pointer]){			//si no hay mas trabajos en la cola pongo el puntero en 0
		job_pointer=0;
	} else {
	
		mdm.get_next_mdm(msg.get_next_msg(active_jobs[job_pointer],ctrl.enviar_msg()));
		job_pointer++;
	}
	
}

*/
