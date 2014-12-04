var mongoose = require('mongoose');
var config = require('../config/config');
var Schema = mongoose.Schema;
var err,data,callback;
var msgSchema = new Schema({
	dst: String,			//nro tel destino
	msg: String,			//texto del mensaje
	sta: Number,			//estado del mensaje (enviado(10), pendiente(1), err_dst(13))
	h_in: Number,			//hora de insercion en BBDD
	h_out: Number,			//hora en la que se envio le msg
	job: Number,			//nro de job al que pertenece el msg
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

exports.insert_msg = function(dst,msg,job,callback){
	msgdata = {dst:dst,msg:msg,sta:1,h_in:parseInt(Date.now()),h_out:0,job:job,imei:0};
	Msg.create(msgdata,function(err,data){
	        contestar(err,data,callback);
	})
}

exports.get_next_msg = function(job_num,callback){
        var ahora=parseInt(Date.now());
        var query = Msg
	            .findOne({job:job_num,sta:1,h_in:{$lt:ahora}})
	            .select('dst msg h_in')
	            .sort(h_in: 1)
	            .exec(function(err,data){
	                    contestar(err,data,callback);
	            })
}

exports.count_msg = function(job_num,status,callback){
	Msg.count({job:job_num,sta:status},function(err,data){
                contestar(err,data,callback);
	})
}

//exports.update_msg(h_out,imei,sta){};
