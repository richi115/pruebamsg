var db = require('../db/db');
var job = require('../models/job');
var msg = require('../models/mensaje');




//generar mensajes
function mensajes(job_id,cant_msg){
	for(var i=0;i<cant_msg;i++){
		var dst='+34' + parseInt(Math.random()*100000000);
		var txt=["hola","publicidad","prueba","test","caniche","notificacion","resultado","cuota"];
		var rand1=parseInt(Math.random()*8)	
		msg.insert_msg(job_id,dst,txt[rand1]+' '+i,function(data){
			console.log('MSG a Destino: ' + data.dst + ' Insertado OK: ' + data.job);
		});
	}
}


//generar job
function jobs(cant_jobs){
	var fecha;
	var cant_msgs
	var usr=["richi","rigonzal","enano","mariano","testuser1","testuser2","testuser3"];
	for(var i=0;i<cant_jobs;i++){
		indice_user=parseInt(Math.random()*usr.length)
		cant_msgs=parseInt(Math.random()*6)+3
		fecha=parseInt(Date.now()/1000-Math.random()*2000);
		job.insert_job(i+1,usr[indice_user],fecha,"Prueba " + i,cant_msgs,1,function(data){
			console.log('JOB: ' + data.nro + ' Insertado OK');
			mensajes(data.nro,data.pendiente)
		});
	}	
}	


jobs(3)