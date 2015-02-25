var async = require('async');


var a=[5,5,5,5]



async.map(a,
	function(aencurso,callback){
		aencurso+=2
		callback(null,aencurso)
	},
	function(err,result){
		console.log(result)
	}
)

