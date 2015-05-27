var config = require('../config/config');


var CANT_MDM = 1;



exports.load_mdm = function(callback){
	var mdms=[];
	setTimeout(function(){
		for(var i=1;i<CANT_MDM;i++){
			var imei=parseInt(Math.pow(Math.random()*1000,3));
			//var sta=parseInt(Math.random()*2);	//0 es libre, 1 es en uso
			var ultimo=parseInt(Date.now()/1000)-parseInt(Math.random()*10);
			mdms[i] = {tty:i,sta:0,operativo:true,imei:imei,mdl:'e303',lst_use:ultimo,grp:1};
		}
		callback(mdms)
	},2000)
}

exports.reset=function(modems){
	var i=0,cant_mdms=modems.length
	for(;i<cant_mdms;i++){
		modems[i].sta=0
	}
}

