var async = require('async');

async.series([
    function(callback){
		console.log('cb1:' + callback);
        setTimeout(function(){
			console.log('Funcion 1');
            callback(null, 1232); // err, result
        }, 1000);
    },
    function(callback){
		console.log('cb12' + callback);
        setTimeout(function(){
			console.log('Funcion 2');
			callback(null, 2); // err, result
        }, 2000);
    }
],
function(err, results){
	console.log('Resultado final: ' + results[0]);
	console.log('Resultado final: ' + results[1]);

    // err propagates all errors within the parallel functions
    // results holds all the results, [1, 2] in this case, because the first function returns earlier (50 ms)
});