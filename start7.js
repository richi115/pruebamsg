var config = require('./config/config');
var db = require('./db/db');
var job = require('./models/job');
var auxfunc = require('./controller/auxfunctions');
var enviomsg = require('./controller/enviomsgs')
var mdm = require('./controller/gestionmdms');
var msg = require('./models/mensaje');
var async = require('async');
var updat = require('./controller/actualizar')



var mdm_rescan=10000
var act_mdms=[]


function guardar_estado(mensajes,jobs){
	updat.actualizar_msg(mensajes,function(){
		console.log('Estado de mensajes actualizado en BBDD')
		updat.actualizar_job(jobs,function(){
			console.log('Estado de jobs actualizado en BBDD')
			carga_modems()
		})
	})
}

function carga_msgs(modems,act_jobs){
	auxfunc.generar_cola_msgs(modems,act_jobs,function(total_mensajes){
		console.log('Cargados un total de: '+total_mensajes.length)
		enviomsg.procesar_cola_msg(modems,total_mensajes,function(){
			console.log('Todos los mensajes enviados')
			guardar_estado(total_mensajes,act_jobs)
		})
	})
}


function carga_jobs(modems){
	job.load_job(function(act_jobs){
		var msg_por_job
		console.log('Cargados ' + act_jobs.length + ' job(s)')
		auxfunc.ponderacion(act_jobs,act_mdms.length*config.MSG_POR_MDM)
		carga_msgs(modems,act_jobs)
	})
}


function carga_modems(){								//Paso 1 cargar modems leyendo FS
	if (mdm_rescan>config.MDM_RESCAN){
			act_mdms=[]
			mdm.load_mdm(function(datos_mdms){
				act_mdms=datos_mdms
				mdm_rescan=0
				console.log('Cargados ' + act_mdms.length + ' modem(s)')
				carga_jobs(act_mdms);
			})
	} else {
		mdm_rescan++;
		console.log('No fue necesario reload');
		mdm.reset(act_mdms)
		carga_jobs(act_mdms);
	}
}
		

//jobsysnc (solo se ejecuta una vez al arrancar)

setTimeout(function(){
	console.log('Starting...')
	carga_modems()
},2000)

