var mongoose = require('mongoose');
var config = require('../config/config');
var Schema = mongoose.Schema;
var err,data,callback;
var mdmSchema = new Schema({
	tty: Number,			//nro usb del mdm
	sta: Boolean,			//estado del modem (ok, error)
	imei: Number,			//imei del modem
	mdl: String,			//modelo del modem
	lst_use: Number,		//timestamp del ultimo uso del modem
	grp: Number			//grupo del modem
});
var Mdm = mongoose.model('Mdm',mdmSchema);

function contestar(err,data,callback){
	if(err){
		console.log(err);
        }
	else{
		callback(data);
        }
}

exports.insert_mdm = function(tty,imei,mdl,grp,callback){
	data = {tty:tty,sta:true,imei:imei,mdl:mdl,lst_use:0,grp:grp};
	Mdm.create(data,function(err, data){
                contestar(err,data,callback);
        })
}

exports.find_mdm_tty = function(tty,callback){
	Mdm.findOne({'tty': tty},function(err,data){
	        contestar(err,data,callback);
        })
}

exports.find_mdm_imei = function(imei,callback){
	Mdm.findOne({'imei': imei},function(err,data){
	        contestar(err,data,callback);
        })
}

exports.get_next_mdm = function(callback){
        var ahora = parseInt(Date.now())-config.DELAY_MDM; //ahora - config.DELAY_MDM = lst_use + config.DELAY_MDM
        var query = Mdm
                    .findOne({lst_use:{$lt:ahora}})
                    .select('tty imei')
                    .sort({lst_use: 1})
                    .exec(function(err,data){
	                    contestar(err,data,callback);
        })
}
