var db = require('../db/db');
var mdm = require('../models/modem');
var job = require('../models/job');
var msg = require('../models/mensaje');

var a,fecha;
var cant_job=4;
var job_counter=0;
var CANT_MDM=20,CANT_MSG=100,CANT_JOB=5;

//generar modems
for(i=0;i<CANT_MDM;i++){
	a=Math.random()*1000;
	fecha=parseInt(Date.now()/1000+a);
	imei=a^24;
	mdm.insert_mdm(i,imei,"e303",0,function(data){
		console.log('TTY: ' + data.tty + ' Insertado OK');
	});
}

//generar mensajes
for(i=0;i<CANT_MSG;i++){
	var dst='+34' + parseInt(Math.random()*100000000);
	var msg=["hola","publicidad","prueba","test","caniche"];
	
	msg.insert_msg(dst,msg[job_counter],job_counter,function(data){
		console.log('MSG a Destino: ' + data.dst + ' Insertado OK');
	});
	
	job_counter++;
	if(job_counter=cant_job){job_counter=0;}
}

//generar job
for(i=0;i<CANT_JOB;i++){

	


