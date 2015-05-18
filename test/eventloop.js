var events=require('events')

var emisor = new events.EventEmitter();


emisor.on('evento',function(){
	console.log('Me llego un evento')
})

function test(a,b){
	console.log(a+b)
}

test(5,6)

