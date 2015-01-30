var mongoose = require('mongoose');
var config = require('../config/config');
var Schema = mongoose.Schema;
var err,data,callback;
var jobSchema = new Schema({
	usr: String,		//el usuario que creo el job
	inicio: Number,		//el usuario indica a partir de cuando se empiezan a enviar los msgs
	                        //la fecha ya debe venir en timestamp
	coment: String,		//comentario del usuario
	total_msg: Number,	//total de mensajes en el job
	env_ok: Number,		//mensajes enviados OK
	err_dst: Number,	//mensajes con error de destino
	status: Number,		//estado del proceso (pendiente(0), finalizado(2))
	metodo: Number		//plat. de envio (plat. de distintos paises, diferenter carriers, etc)
});
var Job = mongoose.model('Job',jobSchema);

function contestar(err,data,callback){
	if(err){
		console.log(err);
        }
	else{
		callback(data);
        }
}

exports.insert_job = function(usr,inicio,coment,total_msg,metodo,callback){
	var jobdata={usr:usr,inicio:inicio,coment:coment,total_msg:total_msg,env_ok:0,err_dst:0,status:0,metodo:metodo}
	Job.create(jobdata,function(err,data){
                contestar(err,data,callback);
        })
}

exports.load_job = function(callback){
    var ahora=parseInt(Date.now()/1000);
    var query = Job
                .find({inicio:{$lt:ahora},status:0})
				.sort({inicio: 1})
                .limit(config.JOB_SIM)
                .exec(function(err,data){
                        contestar(err,data,callback)
                })
}

exports.update_job_stats = function(status,callback){
	Job.findOne({_id:status.jobid},function(err,data){
		data.total_msg=status.total;
		data.env_ok=status.enviados;
		data.err_dst=status.error;
		data.save(function(err,data){
                        contestar(err,data,callback)
        });
	});
}
