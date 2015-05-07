var envio=require('./eventos-module')

MDM=8
MSG=2000

var mdms = []

var msgs = []

var i

for(i=0;i<MDM;i++){
	mdms[i]={mdm:i,sta:0}
}


for(i=0;i<MSG;i++){
	msgs[i]={id:i,sta:0}
}



envio.procesar_cola_msg(mdms,msgs,function(){
	console.log('Todo listo')
})

