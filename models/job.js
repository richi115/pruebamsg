var mongoose = require('mongoose');
var config = require('../config/config');
var Schema = mongoose.Schema;
var err,data,callback;
var jobSchema = new Schema({
	nro: Number,
	usr: String,		//el usuario que creo el job
	inicio: Number,		//fecha inicio job en timestamp
	coment: String,		//comentario del usuario
	pendiente: Number,	//total de mensajes pendientes de enviar en el job
	env_ok: Number,		//mensajes enviados OK
	err_dst: Number,	//mensajes con error de destino
	status: Number,		//estado del proceso (pendiente(0), finalizado(2), cargando(9))
	metodo: Number		//plat. de envio (plat. de distintos paises, diferenter carriers, etc)
});
var Job = mongoose.model('Job',jobSchema);

function contestar(err,data,callback){
	if(err){
		console.log(err);
		//agregar escritura en log de errores
        }
	else{
		callback(data);
        }
}


exports.get_next_job = function(callback){
	var query = Job
		.find()
		.sort({nro: -1})
		.limit(1)
//		.lean()
		.exec(function(err,data){
			if(data.length){
				contestar(err,parseInt(data[0].nro+1),callback)
			} else {
				contestar(err,1,callback)
			}
		})
}
		

exports.insert_job = function(nro,usr,inicio,coment,total_msg,metodo,callback){
	var jobdata={nro:nro,usr:usr,inicio:inicio,coment:coment,pendiente:total_msg,env_ok:0,err_dst:0,status:0,metodo:metodo}
	Job.create(jobdata,function(err,data){
                contestar(err,data,callback);
        })
}

exports.load_job = function(callback){
    var ahora=parseInt(Date.now()/1000);
    var query = Job
                .find({inicio:{$lt:ahora},status:0})
				.sort({inicio: 1})
                .limit(config.JOB_LIMIT)
				.lean()
                .exec(function(err,data){
                        contestar(err,data,callback)
                })
}


exports.count_pending_jobs = function(callback){
	Job.count({status:0},function(err,result){
		contestar(err,result,callback);
	})
}

exports.update_job = function(job,callback){
	Job.findOne({nro:job.nro},function(err,data){
		data.status=job.status;
		data.pendiente=data.pendiente-job.msg_a_enviar;
		data.env_ok=data.env_ok+job.msg_a_enviar;
		data.save(function(err,data){
                        contestar(err,data,callback)
        });
	});
}

exports.status_update_job = function(job,callback){
	Job.findOne({nro:job.nro},function(err,data){
		data.status=job.status;
		data.save(function(err,data){
                        contestar(err,data,callback)
        });
	});
}