var events=require('events')

var emisor = new events.EventEmitter();


exports.procesar_cola_msg = function(modems,mensajes,callback){
	emisor.on('modemlibre',function(){
		var pos_mdm,pos_msg
		pos_mdm=get_next(modems)
		pos_msg=get_next(mensajes)
		enviar_msg(pos_mdm,pos_msg,modems,mensajes,callback)
	})
	disparar_eventos(modems)
}

function enviar_msg(pos_mdm,pos_msg,modems,mensajes,callback){
	var rand=parseInt(Math.random()*2000)+1000
	modems[pos_mdm].sta=1
	if(pos_msg<mensajes.length){
		mensajes[pos_msg].sta=1
		mensajes[pos_msg].imei=modems[pos_mdm].imei
		console.log('Enviado msg '+mensajes[pos_msg].dst+' por mdm '+modems[pos_mdm].tty)
		//Aqui hago la llamada al modem asignado y espero la vuelta para emitir el siguiente evento
		setTimeout(function(){
			modems[pos_mdm].sta=0
			emisor.emit('modemlibre')
			},rand)
	} else {
		emisor.removeAllListeners('modemlibre')
		callback()
	}
}

function disparar_eventos(modems){
	for(var a=0;a<modems.length;a++){
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

