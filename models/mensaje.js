var mongoose = require('mongoose');
var config = require('../config/config');
var Schema = mongoose.Schema;
var err,data,callback;
var msgSchema = new Schema({
	job: Number,			//nro de job al que pertenece el msg
	dst: String,			//nro tel destino
	msg: String,			//texto del mensaje
	sta: Number,			//estado del mensaje (enviado(1), pendiente(0), err_dst(13))
	h_in: Number,			//hora de insercion en BBDD
	h_out: Number,			//hora en la que se envio le msg
	imei: String			//imei del modem que envio el mensaje
});
var Msg = mongoose.model('Msg',msgSchema);

function contestar(err,data,callback){
	if(err){
		console.log(err);
        }
	else{
		callback(data);
        }
}

exports.count_msg_total = function(job_id,callback){
	Msg.count({job:job_id},function(err,result){
		contestar(err,result,callback);
	})
}


exports.insert_msg = function(job,dst,msg,callback){
	msgdata = {job:job,dst:dst,msg:msg,sta:0,h_in:parseInt(Date.now()/1000),h_out:0,imei:0};
	Msg.create(msgdata,function(err,result){
	        contestar(err,result,callback);
	})
}

exports.load_msgs = function(job_num,msg_asign,callback){
        var query = Msg
			.find({'job':job_num,'sta':0})
			.lean()
			.sort({h_in: 1})
			.limit(msg_asign)
			.exec(function(err,result){
				contestar(err,result,callback);
		})
}

exports.count_msg_status = function(job_id,status,callback){
	Msg.count({job:job_id,sta:status},function(err,result){
		contestar(err,result,callback);
	})
}


exports.update_msg = function(mensaje,callback){
	Msg.findOne({_id:mensaje._id},function(err,data){
		data.sta=mensaje.sta
		data.h_out=parseInt(Date.now()/1000);
		data.imei=mensaje.imei;
		data.save(function(err,data){
                        contestar(err,data,callback)
        });
	});
}
