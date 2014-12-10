var db = require('../db/db');
var mdm = require('../models/modem');
var job = require('../models/job');
var msg = require('../models/mensaje');

var CANT_MDM=20,CANT_MSG=20,CANT_JOB=4;

//generar modems
function modems(){
	var a,fecha;
	for(i=0;i<CANT_MDM;i++){
		a=Math.random()*1000;
		fecha=parseInt(Date.now()/1000+a);
		imei=parseInt(Math.pow(a,3));
		mdm.insert_mdm(i,imei,"e303",0,function(data){
			console.log('TTY: ' + data.tty + ' Insertado OK' + ' i: ' + i);
		});
	}
}

//generar mensajes
function mensajes(job_id){
	var txt_switch=0;
	for(i=0;i<CANT_MSG;i++){
		var dst='+34' + parseInt(Math.random()*100000000);
		var txt=["hola","publicidad","prueba","test","caniche"];
		
		msg.insert_msg(dst,txt[txt_switch],job_id,function(data){
			console.log('MSG a Destino: ' + data.dst + ' Insertado OK: ' + data.job);
		});
		
		txt_switch++;
		if(txt_switch>txt.length){txt_switch=0;}
	}
}


//generar job
function jobs(){
	var a,fecha;
	for(i=0;i<CANT_JOB;i++){
		a=Math.random()*1000;
		fecha=parseInt(Date.now()/1000+a);
		var usr=["richi","churri123","enano","perro","gato"];
		job.insert_job(usr[i],fecha,"Prueba " + i,i*1000+1000,1,function(data){
			console.log('JOB: ' + data._id + ' Insertado OK');
			mensajes(data._id);
		});
	}	
}	

modems();
jobs();

