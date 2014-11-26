var mongoose = require('mongoose');
var config = require('../config/config');
var Schema = mongoose.Schema;

var mdmSchema = new Schema({
	tty: Number,			//nro usb del mdm
	sta: Boolean,			//estado del modem (ok, error)
	imei: Number,			//imei del modem
	mdl: String,			//modelo del modem
	lst_use: Number,		//timestamp del ultimo modem
	grp: Number				//grupo del modem
});

Mdm = mongoose.model('Mdm',mdmSchema);

exports.insert_mdm = function(tty,imei,mdl,grp,callback){

	data = {tty:tty,sta:true,imei:imei,mdl:mdl,lst_use:0,grp:grp};

	Mdm.create(data,function(err, data){
	if(err){
		console.log(err);
            }
	else{
		callback(data);
            }
        })
};

exports.find_mdm_tty = function(tty,callback){
	Mdm.findOne({'tty': tty},function(err,data){
		callback(data);
	})
}


exports.find_mdm_imei = function(imei,callback){
	Mdm.findOne({'imei': imei},function(err,data){
		callback(data);
	})
}


exports.find_mdm_lstuse = function(callback){
    var ahora=parseInt(Date.now())+config.DELAY_MDM;
	Mdm.findOne({lst_use:{$lt:ahora}},'tty imei',{sort: {lst_use: -1}},function(err,data){
		callback(data);
	})
}

