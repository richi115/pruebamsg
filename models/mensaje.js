var mongoose = require('mongoose');
var config = require('../config/config');
var Schema = mongoose.Schema;
var err,data,callback;
var msgSchema = new Schema({
	job: Number,			//nro de job al que pertenece el msg
	dst: String,			//nro tel destino
	msg: String,			//texto del mensaje
	sta: Number,			//estado del mensaje (enviado(10), pendiente(1), err_dst(13))
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
	msgdata = {job:job,dst:dst,msg:msg,sta:1,h_in:parseInt(Date.now()/1000),h_out:0,imei:0};
	Msg.create(msgdata,function(err,result){
	        contestar(err,result,callback);
	})
}

exports.load_msgs = function(job_num,msg_asign,callback){
        var query = Msg
	            .find({'job':job_num,'sta':1})
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


exports.update_msg = function(status,callback){
	Job.findOne({_id:status.jobid},function(err,data){
		data.total_msg=status.total;
		data.env_ok=status.enviados;
		data.err_dst=status.error;
		data.save(function(err,data){
                        contestar(err,data,callback)
        });
	});
}
