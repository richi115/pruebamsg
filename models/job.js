var mongoose = require('mongoose');
var config = require('../config/config');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
	usr: String,		//el usuario que creo el job
	inicio: Number,		//el usuario indica a partir de cuando se empiezan a enviar los msgs
	                        //la fecha ya debe venir en timestamp
	coment: String,		//comentario del usuario
	total_msg: Number,	//total de mensajes en el job
	env_ok: Number,		//mensajes enviados OK
	err_dst: Number,	//mensajes con error de destino
	status: Number,		//estado del proceso (pendiente(0), activo(1), finalizado(2))
	metodo: Number		//plat. de envio (plat. de distintos paises, diferenter carriers, etc)
});

Job = mongoose.model('Job',jobSchema);

exports.insert_job = function(usr,inicio,coment,total_msg,metodo,callback){

	var jobdata={usr:usr,inicio:inicio,coment:coment,total_msg:total_msg,env_ok:0,err_dst:0,status:0,metodo:metodo}
	
	Job.create(jobdata,function(err, data){
	if(err){
		console.log(err);
            }
	else{
		callback(data);
            }
        })
};


exports.load_job = function(callback){
    var ahora=parseInt(Date.now());
    Job.find({inicio:{$lt:ahora}},function(err,data){
		callback(data);
	})
}       





//exports.update_job = function(


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
