var events=require('events')
var async=require('async')

var emisor = new events.EventEmitter();



var mdms = [{mdm:1,sta:0},
		    {mdm:2,sta:0},
		    {mdm:3,sta:0}]
			
var msgs = [{id:1,sta:0},
			{id:2,sta:0},
			{id:3,sta:0},
			{id:4,sta:0},
			{id:5,sta:0},
			{id:6,sta:0},
			{id:7,sta:0},
			{id:8,sta:0},
			{id:9,sta:0},
			{id:10,sta:0}]

			

emisor.on('modemlibre',function(){
	var mdm,msg
	mdm=get_next(mdms)
	msg=get_next(msgs)
	enviar_msg(mdm,msg)
})		


function get_next(arr){
	for(var i=0;i<arr.length;i++){
		if(arr[i].sta===0) {
			return i
		}
	}
	console.log(mdms)
	console.log(msgs)
	process.exit()
}


function enviar_msg(mdm,msg){
	console.log('Enviando msg '+msgs[msg].id+' por mdm '+mdms[mdm].mdm)
	mdms[mdm].sta=1
	setTimeout(function(){
		mdms[mdm].sta=0
		msgs[msg].sta=1
		emisor.emit('modemlibre')
		},1000)
}

emisor.emit('modemlibre')