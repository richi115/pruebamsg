var envio=require('./enviosms')


envio.enviosms('/dev/ttyUSB1','Esto es una prueba',634533103,function(){
	console.log('done')
})
