var config = require('./config/config');
var db = require('./db/db');
var job = require('./models/job');
var ctrl = require('./controller/auxfunctions');
var mdm = require('./controller/gestionmdms');
var msg = require('./models/mensaje');
var async = require('async');



var mdm_rescan=10000
var act_mdms=[]


function carga_msgs(modems,act_jobs){
	ctrl.generar_cola_msgs(modems,act_jobs,function(total_mensajes){
		console.log('Cargados un total de: '+total_mensajes.length)
	})
}


function carga_jobs(modems){
	job.load_job(function(act_jobs){
		var msg_por_job
		console.log('Cargados ' + act_jobs.length + ' job(s)')
		ctrl.ponderacion(act_jobs,act_mdms.length*config.MSG_POR_MDM)
		carga_msgs(modems,act_jobs)
	})
}


function carga_modems(){								//Paso 1 cargar modems leyendo FS
	if (mdm_rescan>config.MDM_RESCAN){
			mdm.load_mdm(function(datos_mdms){
				act_mdms=datos_mdms
				mdm_rescan=0
				console.log('Cargados ' + act_mdms.length + ' modem(s)')
				carga_jobs(act_mdms);
			})
	} else {
		mdm_rescan++;
		console.log('No fue necesario reload');
		carga_jobs(act_mdms);
	}
}
		

//jobsysnc (solo se ejecuta una vez al arrancar)

setTimeout(function(){
	console.log('Starting...')
	carga_modems()
},2000)

