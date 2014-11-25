var mongoose = require('mongoose');
var config = require('../config/config');
var Schema = mongoose.Schema;

var msgSchema = new Schema({
	dst: String,			//nro tel destino
	msg: String,			//texto del mensaje
	sta: Number,			//estado del mensaje (enviado(1), pendiente(0), err_dst(10))
	h_in: Date,				//hora de insercion en BBDD
	h_out: Date,			//hora en la que se envio le msg
	job: Number,			//nro de job al que pertenece el msg
	imei: String,			//imei del modem que envio el mensaje
	metodo: Number			//plat. de envio (plat. de distintos paises, diferenter carriers, etc)
	
});

Msg = mongoose.model('Msg',mdmSchema);

exports.insert_msg = function(data,callback){
	Msg.create(data,function(err, data){
	if(err){
		console.log(err);
		return false;
            }
	else{
		callback(data);
            }
        })
};

exports.get_next_msg(job_num, callback){};
