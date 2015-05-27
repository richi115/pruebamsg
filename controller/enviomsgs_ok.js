var events=require('events')
var sms=require('./enviosms')


var emisor = new events.EventEmitter();
var eventcounter
var msg_pointer


exports.procesar_cola_msg = function(modems,mensajes,callback){
	msg_pointer=0
	eventcounter=0
	if(mensajes.length){
		emisor.on('modemlibre',function(){
			var pos_mdm=get_next(modems)
			enviar_msg(pos_mdm,modems,mensajes,callback)
			msg_pointer++
		})
		disparar_eventos(modems)
	} else {
		callback()
	}
}
	
	
	
function enviar_msg(pos_mdm,modems,mensajes,callback){
	var ahora=parseInt(Date.now()/1000)
	var rand=parseInt(Math.random()*1000)+1000
	var pos_msg=msg_pointer
	modems[pos_mdm].sta=1			//indico que el modem esta en uso

	//Aqui hago la llamada al modem asignado y espero la vuelta para emitir el siguiente evento
	//Este es el callback que hay que pasarle a la funcion envio del mensaje al modem asignado
	setTimeout(function(){
		mensajes[pos_msg].sta=1
		mensajes[pos_msg].imei=modems[pos_mdm].imei
		console.log('Enviado msg '+mensajes[pos_msg].dst+' por mdm '+modems[pos_mdm].tty)
		modems[pos_mdm].sta=0		//libero modem
		if(msg_pointer<mensajes.length){		
			emisor.emit('modemlibre')
			} else {							//si estan todos enviados
			eventcounter--
			if(!eventcounter){
				emisor.removeAllListeners('modemlibre')
				callback()
			}
		}
	},rand)
}


function disparar_eventos(modems){
	var cant_mdms=modems.length
	eventcounter=cant_mdms
	for(var i=0;i<cant_mdms;i++){
		emisor.emit('modemlibre')
	}
}

function get_next(arr){
	for(var i=0;i<arr.length;i++){
		if(arr[i].sta===0) {
			return i
		}
	}
}

