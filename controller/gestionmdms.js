var config = require('../config/config');

var CANT_MDM = 5;



exports.load_mdm = function(callback){
	var mdms=[];
	for(var i=0;i<CANT_MDM;i++){
		var imei=parseInt(Math.pow(Math.random()*1000,3));
		//var sta=parseInt(Math.random()*2);	//0 es libre, 1 es en uso
		var ultimo=parseInt(Date.now()/1000)-parseInt(Math.random()*10);
		mdms[i] = {tty:i,sta:0,operativo:true,imei:imei,mdl:'e303',lst_use:ultimo,grp:1};
	}
	callback(mdms);
}

			
exports.get_nxt_mdm = function(array_mdms){
	var ahora=parseInt(Date.now()/1000)
	var masantiguo=ahora*2
	var indice=0
	for(var i=0;i<array_mdms.length;i++){
		if(array_mdms[i].lst_use<masantiguo && !array_mdms[i].sta){
			masantiguo=array_mdms[i].lst_use
			indice=i
		}
	}
	return indice
}

exports.hay_mdm_libre = function(array_mdms){		//devuelve 1 si hay por lo menos un modem libre
	for(var i=0;i<array_mdms.length;i++){
		if(!array_mdms[i].sta){
			return 1
		}
	}
	return 0
}
