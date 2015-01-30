var config = require('../config/config');

var CANT_MDM = 12;


exports.load_mdm = function(mdms,callback){
	for(i=0;i<CANT_MDM;i++){
		imei=parseInt(Math.pow(Math.random()*1000,3));
		mdms[i] = {tty:i,sta:true,imei:imei,mdl:'e303',lst_use:0,grp:1};
	}
	callback();
}

			
exports.get_nxt_mdm = function(){
	var ahora = parseInt(Date.now()/1000)-config.DELAY_MDM;
	
	
}