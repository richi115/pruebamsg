var config = require('./config/config');
var db = require('./db/db');
var job = require('./models/job');


for(i=0;i<10;i++){
		job.load_job(function(datos){
			function a(){
				a=i
				console.log('Lectura nro: '+ a)
			}
			
		})	
}