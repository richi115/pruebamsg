var db = require('../db/db');
var job = require('../models/job');
var msg = require('../models/mensaje');

var CANT_MSG=40,CANT_JOB=4;


//generar mensajes
function mensajes(job_id){
	for(i=0;i<CANT_MSG;i++){
		var dst='+34' + parseInt(Math.random()*100000000);
		var txt=["hola","publicidad","prueba","test","caniche","notificacion","resultado","cuota"];
		var rand1=parseInt(Math.random()*8)	
		msg.insert_msg(job_id,dst,txt[rand1]+' '+i,function(data){
			console.log('MSG a Destino: ' + data.dst + ' Insertado OK: ' + data.job);
		});
	}
}


//generar job
function jobs(){
	var a,fecha;
	var usr=["richi","rigonzal","enano","mariano","testuser1","testuser2","testuser3"];
	var cant=[300,400,250,500,400,400,500]
	for(i=0;i<CANT_JOB;i++){
		rand1=parseInt(Math.random()*7)
		rand2=parseInt(Math.random()*7)
		fecha=parseInt(Date.now()/1000-Math.random()*2000);
		job.insert_job(i+1,usr[rand1],fecha,"Prueba " + i,cant[rand2],1,function(data){
			console.log('JOB: ' + data._id + ' Insertado OK');
		});
	}	
}	


mensajes(1);
mensajes(2);
mensajes(3);
mensajes(4);

