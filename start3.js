var config = require('./config/config');
var db = require('./db/db');
var mdm = require('./controller/gestionmdms');
var job = require('./models/job');
var async = require('async');
var ctrl = require('./controller/auxfunctions');
var msg = require('./models/mensaje');


var act_mdms=[]
var act_jobs=[]
var act_msgs=[]
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
				msg.load_msg(act_jobs[0]._id,act_jobs[0].msg_a_enviar,function(mensajes){
					act_msgs=mensajes
					callback(null,'MSGS: Cargados '+ act_msgs.length + ' mensaje(s)')
				})
			}],
			function(err, resultados){
				console.log(resultados[0])
				console.log(resultados[1])
				console.log(act_msgs)
			//	next()
			}
		)
//	}
//)
		