var events=require('events')
var async=require('async')

var emisor = new events.EventEmitter();



var mdms = [{mdm:1,sta:0},
		    {mdm:2,sta:0},
		    {mdm:3,sta:0},
		    {mdm:4,sta:0},
		    {mdm:5,sta:0},
			{mdm:6,sta:0},
		    {mdm:7,sta:0},
		    {mdm:8,sta:0},
		    {mdm:9,sta:0},
		    {mdm:10,sta:0}]

			
var msgs = [{id:1,sta:0},
			{id:2,sta:0},
			{id:3,sta:0},
			{id:4,sta:0},
			{id:5,sta:0},
			{id:6,sta:0},
			{id:7,sta:0},
			{id:8,sta:0},
			{id:9,sta:0},
			{id:10,sta:0},
			{id:11,sta:0},
			{id:12,sta:0},
			{id:13,sta:0},
			{id:14,sta:0},
			{id:15,sta:0},
			{id:16,sta:0},
			{id:17,sta:0},
			{id:18,sta:0},
			{id:19,sta:0},
			{id:20,sta:0},
			{id:21,sta:0},
			{id:22,sta:0},
			{id:23,sta:0},
			{id:24,sta:0},
			{id:25,sta:0},
			{id:26,sta:0},
			{id:27,sta:0},
			{id:28,sta:0},
			{id:29,sta:0},
			{id:30,sta:0},
			{id:31,sta:0},
			{id:32,sta:0},
			{id:33,sta:0},
			{id:34,sta:0},
			{id:35,sta:0},
			{id:36,sta:0},
			{id:37,sta:0},
			{id:38,sta:0},
			{id:39,sta:0},
			{id:40,sta:0}]

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
	var rand=parseInt(Math.random()*3000)+1000
	console.log('Enviando msg '+msgs[msg].id+' por mdm '+mdms[mdm].mdm)
	mdms[mdm].sta=1
	msgs[msg].sta=1
	setTimeout(function(){
		mdms[mdm].sta=0
		emisor.emit('modemlibre')
		},rand)
}

emisor.emit('modemlibre')
emisor.emit('modemlibre')
emisor.emit('modemlibre')
emisor.emit('modemlibre')
emisor.emit('modemlibre')
emisor.emit('modemlibre')
emisor.emit('modemlibre')
emisor.emit('modemlibre')
emisor.emit('modemlibre')
emisor.emit('modemlibre')