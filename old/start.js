var config = require('./config/config');
var db = require('./db/db');
var mdm = require('./models/modem');
var job = require('./models/job');
var msg = require('./models/mensaje');
var ctrl = require('./controller/auxfunctions');

var next_job_sync=0
var next_job_reload=0;
var active_jobs = [];
var job_pointer=0;

/*
job.load_job(function(active_jobs){

	ctrl.jobsync(active_jobs,function(data){
		console.log('job synced: '+ data);
	});
});
*/

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
