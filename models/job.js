var mongoose = require('mongoose');
var config = require('../config/config');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
	job: Number,		//nro del job
	usr: String,		//el usuario que creo el jbob
	inicio: Number,		//el usuario indica a partir de cuando se empiezan a enviar los msgs
	coment: String,		//comentario del usuario
	total_msg: Number,	//total de mensajes en el job
	env_ok: Number,		//mensajes enviados OK
	err_dst: Number,	//mensajes con error de destino
	status: Number		//estado del proceso (pendiente(0), activo(1), finalizado(2))
});

Job = mongoose.model('Job',jobSchema);

exports.insert_job = function(data,callback){
	Job.create(data,function(err, data){
	if(err){
		console.log(err);
            }
	else{
		callback(data);
            }
        })
};


exports.load_job = function(data,callback){
        var ahora=parseInt(Date.now());
	Job.find({inicio:{$lt:ahora},null,{sort: {inicio: -1}},function(err,data){
		callback(data);
	})
}


/*
exports.jobsync = function(active_jobs){
		for(i=0;i<active_jobs.length;i++){
			msg.count({job: active_jobs[i].job}, function(err, result){
				if (err) {
					console.log('Error al actualizar cantidad en job:' + active_jobs[i].job);
				}
				else {
					active_jobs[i].Total_msg = result;
				}
			});
			
			msg.count({job: active_jobs[i].job, sta: 1}, function(err, result){
				if (err) {
					console.log('Error al actualizar enviados OK en job:' + active_jobs[i].job);
				}
				else {
					active_jobs[i].env_ok = result;
				}
			});

			msg.count({job: active_jobs[i].job, sta: 10}, function(err, result){
				if (err) {
					console.log('Error al actualizar err_dst en job:' + active_jobs[i].job);
				}
				else {
					active_jobs[i].err_dst = result;
				}
			});
			
			Cuando los trens hayan terminado (active_jobs[i].pend=active_jobs[i].total_msg - active_jobs[i].env_ok - active_jobs[i].err_dst)
		}
	}

	
*/