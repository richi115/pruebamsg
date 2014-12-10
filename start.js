var config = require('./config/config');
var db = require('./db/db');
var mdm = require('./models/modem');
var job = require('./models/job');
var msg = require('./models/mensaje');
var ctrl = require('./controller/auxfunctions');

var next_job_sync=0
var next_job_reload=0;
var active_jobs = new Array();
var job_pointer=0;

job.load_job(function(data){
	active_jobs = data;
	ctrl.jobsync(active_jobs);
});




/*
mdm.get_next_mdm(function(data){
    console.log(data);
});



/*
while(true){

	if(next_job_sync>config.JOB_SYNC) {
		ctrl.jobsync(active_jobs);	//valida que los mensajes de la coleccion de jobs activos
		next_job_sync=0;		//coincidan con los mensajes en la coleccion msg. Guarda en BBDD los jobs activos.
	}								
	next_job_sync++;
	
	
	if(active_jobs.length<config.JOB_SIM || next_job_reload>config.JOB_RELOAD  ){
		active_jobs=loadjobs(config.JOB_SIM);
		next_job_reload=0;
	}
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
