var config = require('./config/config');
var db = require('./db/db');
var mdm = require('./controller/gestionmdms');
var job = require('./models/job');
var async = require('async');
var ctrl = require('./controller/auxfunctions');
var msg = require('./models/mensaje');
var events = require('events')


var act_mdms=[]
var act_jobs=[]
var mdm_rescan=10000
var msg_por_loop=0



//async.forever(
//	function(next){
		async.series([										//main loop
			function(cb_mainloop){								//Paso 1 cargar modems leyendo FS
				if (mdm_rescan>config.MDM_RESCAN){
					mdm.load_mdm(function(datosmodems){
						act_mdms=datosmodems
						msg_por_loop=act_mdms.length * config.MSG_POR_MDM;
						mdm_rescan=0
						cb_mainloop(null,'Cargados ' + act_mdms.length + ' modem(s)')
					})
				} else {
					mdm_rescan++;
					cb_mainloop(null,'No fue necesario reload, msg por loop: ' + msg_por_loop);
				}
			},
			function(cb_mainloop){								//Paso 2 cargar jobs 
				job.load_job(function(datosjobs){
					act_jobs=ctrl.job_ponderar(datosjobs,msg_por_loop)
					cb_mainloop(null,'JOBS: Cargados '+ act_jobs.length + ' job(s)');
				})
			},
			function(cb_mainloop){								//Paso 3 enviar los mensajes de cada job
				async.each(act_jobs,function(jobencurso,cb_jobloop){   //Por cada job hace este WF 
					async.waterfall([
						function(cb_lotemsg){							//Sacar todos los mensajes de este job
							msg.load_msg(jobencurso._id,jobencurso.msg_a_enviar,function(lotemsgs){
								cb_lotemsg(null,lotemsgs)
								console.log('Procesando JOB: '+jobencurso._id)
							})
						},
						function(lotemsgs,cb_lotemsg){				//Secuencia de envio
							async.each(lotemsgs,function(msgencurso,cb_msgloop){  //Por cada msg unico hacer este WF
								var ee = new events.EventEmitter();
								async.waterfall([                    
									function(cb_sendloop){  				//buscar modem
										var res
										if (mdm.hay_mdm_libre(act_mdms)){
											console.log('agarro un mdm libre')
											res=mdm.get_nxt_mdm(act_mdms)
											act_mdms[res].sta=1				//marco el modem en estado En Uso
											cb_sendloop(null,res)
										} else {
											console.log('esperando que se libere un modem')
											ee.on('ModemLiberado',function(){
												console.log('Liberando modem')
												res=mdm.get_nxt_mdm(act_mdms)
												act_mdms[res].sta=1				//marco el modem en estado En Uso
												cb_sendloop(null,res)
											})
										}
									},
									function(modem_asignado,cb_sendloop){  //enviar mensaje y actualizar estado msg
										var estado_modem=1
										setTimeout(function(){
											console.log('MENSAJE A: '+msgencurso.dst+' USANDO MDM: '+modem_asignado)
											cb_sendloop(null,modem_asignado,estado_modem)
										},5000)
									},
									function(modem_asignado,estado_modem,cb_sendloop){ //actualizar modem
										console.log('Modem '+modem_asignado+' actualizado')
										act_mdms[modem_asignado].sta=0
										ee.emit('ModemLiberado')
										cb_sendloop(null)
									}],
									function(err,result_envio){
										var act=process._getActiveRequests()
										//console.log(act)
										cb_msgloop()
									}
								)
							})
							cb_lotemsg(null,'MSGS: Cargados '+ lotemsgs.length + ' mensaje(s)')
						}],
						function(err,result_msg){
							cb_jobloop()
						}
					)
				})
				cb_mainloop(null)
			}],
			function(err, resultados){
				console.log(resultados[0])
				console.log(resultados[1])
				//next()
			}
		)
	//}
//)
