var config = require('../config/config');
var job = require('../models/job');
var msg = require('../models/mensaje');


exports.generar_cola_msgs=function(modems,act_jobs,callback){
	var mensajes=[]

	function jobiterator(elementos,index,callback){
		if(index==elementos.length){
			return callback(mensajes)
		}
		msg.load_msgs(elementos[index].nro,elementos[index].msg_a_enviar,function(msg_del_job){
			console.log('Cargados ' + msg_del_job.length + ' mensajes(s)' + ' del job '+elementos[index].nro)
			mensajes=mensajes.concat(msg_del_job)
			jobiterator(elementos,index+1,callback)
		})
	}
	
	jobiterator(act_jobs,0,callback)
}

exports.ponderacion=function(jobs,totalmsg_por_loop){
	var acum=0
	var cant_jobs=jobs.length
	var ahora=parseInt(Date.now()/1000);
	var sobrante=0
	var msg_asignados=0
	var cant_msg_job=0
	var faltante=0
	var i
	
	for(i=0;i<cant_jobs;i++){
		acum=acum+ahora-jobs[i].inicio
	}
	for(i=0;i<cant_jobs;i++){
		faltante=0
		cant_msg_job=jobs[i].pendiente			//mensajes del job pendientes de enviar 
		msg_asignados=parseInt((ahora-jobs[i].inicio)*totalmsg_por_loop/acum)    //mensajes asignados a ese job
 		if(msg_asignados>=cant_msg_job){    //si hay mas asignados que el total de 
			jobs[i].msg_a_enviar=cant_msg_job
			jobs[i].status=2  // indico que el job queda finalizado con este envio
			sobrante=sobrante+msg_asignados-cant_msg_job
		} else {
			faltante=cant_msg_job-msg_asignados
			if(faltante<=sobrante){
				jobs[i].msg_a_enviar=cant_msg_job
				jobs[i].status=2  // indico que el job queda finalizado con este envio
				sobrante=sobrante-faltante
				} else {
				jobs[i].msg_a_enviar=msg_asignados+sobrante
				sobrante=0
			}
		}
		if(!jobs[i].msg_a_enviar){
			jobs.splice(i,1)
			i--
			cant_jobs--
		}
	}
	return jobs
}


