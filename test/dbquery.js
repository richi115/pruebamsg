var db = require('../db/db');
var msg=require('../models/mensaje')

var job='54be125889bc64c0153ec5b7'
var limite=15

console.log(job)
msg.load_msg(job,limite,function(resultado){
	//debugger
	resultado[0].asdf=1134123412
	console.log(resultado)
})