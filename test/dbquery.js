var db = require('../db/db');
var msg=require('../models/mensaje')

var job='54be125889bc64c0153ec5b5'
var limite=15
debugger
console.log(job)
msg.load_msg(job,limite,function(resultado){
	console.log(resultado)
})