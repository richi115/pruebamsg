var db = require('../db/db');
var job = require('../models/job');
var msg = require('../models/mensaje');

var cant_trabajos=1
var cant_mensajes=5



//generar mensajes
function mensajes(job_id,cant_msg,callback){
	var cbCount=0
	for(var i=0;i<cant_msg;i++){
		var dst='634533103'
		var txt=["hola","publicidad","prueba","test","caniche","notificacion","resultado","cuota"];
		var rand1=parseInt(Math.random()*8)	
		msg.insert_msg(job_id,dst,txt[rand1]+' '+i,function(data){
			console.log('MSG a Destino: ' + data.dst + ' Insertado OK: ' + data.job);
			cbCount++
			if(cbCount==cant_msg){
				callback(job_id,cant_msg)
			}
		});
	}
}


function jobfunc(job_id,cant_msg){
	var usr=["richi","rigonzal","enano","mariano","testuser1","testuser2","testuser3"];
	indice_user=parseInt(Math.random()*usr.length)
	fecha=parseInt(Date.now()/1000-Math.random()*2000);
	job.insert_job(job_id,usr[indice_user],fecha,'Prueba',cant_msg,1,function(){
		console.log('Cargado JOB: ' + job_id);	
	})
}

job.get_next_job(function(inicial){
	var maximo=cant_trabajos+inicial
	for(;inicial<maximo;inicial++){
		mensajes(inicial,cant_mensajes,jobfunc)
}


})

	

