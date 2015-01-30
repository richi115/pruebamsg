var async=require('async');
var uno=require('./serie2.js');

async.series([
	function(callback){
		uno.nrouno(callback);
	},
	function(callback){
		setTimeout(function(){
			console.log('dos');
		},2500);
		callback(null,'DOS');
	},
	function(callback){
		setTimeout(function(){
			console.log('tres');
			callback(null,'TRES');
		},1000);
		console.log('Segundo tres');
	}],
	function(err,resultados){
		for(i=0;i<resultados.length;i++){
			console.log('Resultado '+i+': '+resultados[i]);
		}
	})