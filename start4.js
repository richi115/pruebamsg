var config = require('./config/config');
var db = require('./db/db');
var mdm = require('./controller/gestionmdms');
var job = require('./models/job');
var async = require('async');
var ctrl = require('./controller/auxfunctions');
var msg = require('./models/mensaje');


var act_mdms=[]
var act_jobs=[]
var mdm_rescan=10000
var msg_por_loop=0

//async.forever(
//	function(next){
		async.series([
			function(callback){
				if (mdm_rescan>config.MDM_RESCAN){
					mdm.load_mdm(function(datosmodems){
						act_mdms=datosmodems
						msg_por_loop=act_mdms.length * config.MSG_POR_MDM;
						mdm_rescan=0
						callback(null,'Cargados ' + act_mdms.length + ' modem(s)')
					})
				} else {
					mdm_rescan++;
					callback(null,'No fue necesario reload, msg por loop: ' + msg_por_loop);
				}
			},
			function(callback){
				job.load_job(function(datosjobs){
					act_jobs=ctrl.job_ponderar(datosjobs,msg_por_loop)
					callback(null,'JOBS: Cargados '+ act_jobs.length + ' job(s)');
				})
			},
			function(callback){
				async.each(act_jobs,function(jobencurso,cb_jobencurso){   //por cada job
					async.waterfall([
						function(callback_msg){							//saco los mensajes de cada job
							var act_msg
							msg.load_msg(jobencurso._id,jobencurso.msg_a_enviar,function(mensajes){
								act_msgs=mensajes
								callback_msg(null,act_msgs)
							})
						},
						function(msg_de_este_job,callback_msg){				//secuencia de envio
							async.eachSeries(msg_de_este_job,function(msgencurso,cb_msgencurso){
								async.waterfall([                    
									function(cb_envio){  				//buscar modem
										var nro_modem=parseInt(Math.random()*100)
										console.log('MODEM ENCONTRADO')
										cb_envio(null,nro_modem)
									},
									function(modem_asignado,cb_envio){  //enviar mensaje y actualizar estado msg
										var estado_modem=1
										console.log('MENSAJE A: '+msgencurso.dst+' USANDO MDM: '+modem_asignado)
										cb_envio(null,modem_asignado,estado_modem)
									},
									function(modem_asignado,estado_modem,cb_envio){ //actualizar modem
										console.log('Modem '+modem_asignado+' actualizado')
										cb_envio(null)
									}],
									function(err,result_envio){
										cb_msgencurso()
									}
								)
								
							})
							callback_msg(null,'MSGS: Cargados '+ msg_de_este_job.length + ' mensaje(s)')
						}],
						function(err,result_msg){
							cb_jobencurso()
						}
					)
				})
				callback(null)
			}],
			function(err, resultados){
				console.log(resultados[0])
				console.log(resultados[1])
				//	next()
			}
		)
//	}
//)
