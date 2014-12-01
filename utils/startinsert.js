var db = require('../db/db');
var mdm = require('../models/modem');
var job = require('../models/job');
var msg = require('../models/mensaje');

var a,fecha;
var job_counter=0;
var CANT_MDM=20,CANT_MSG=100,CANT_JOB=4;

//generar modems
for(i=0;i<CANT_MDM;i++){
	a=Math.random()*1000;
	fecha=parseInt(Date.now()/1000+a);
	imei=parseInt(Math.pow(a,3));
	mdm.insert_mdm(i,imei,"e303",0,function(data){
		console.log('TTY: ' + data.tty + ' Insertado OK' + ' i: ' + i);
	});
}

//generar mensajes
for(i=0;i<CANT_MSG;i++){
	var dst='+34' + parseInt(Math.random()*100000000);
	var txt=["hola","publicidad","prueba","test","caniche"];
	
	msg.insert_msg(dst,txt[job_counter],job_counter,function(data){
		console.log('MSG a Destino: ' + data.dst + ' Insertado OK: ' + data.job + 'i: ' + i);
	});
	
	job_counter++;
	if(job_counter>CANT_JOB){job_counter=0;}
}

//generar job
job_counter=0;

for(i=0;i<=CANT_JOB;i++){
	fecha=parseInt(Date.now()/1000+a);
	var usr=["richi","churri123","enano","perro","gato"];
	job.insert_job(usr[job_counter],fecha,"Prueba " + job_counter,job_counter*1000+1000,1,function(data){
		console.log('JOB: ' + data._id + ' Insertado OK');
	});
	
	job_counter++;
}	
	


