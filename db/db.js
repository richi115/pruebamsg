(function(){

	var mongoose = require('mongoose');

	mongoose.connect('mongodb://localhost/msgdb');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function callback () {
	  	console.log("Conexion a BBDD OK");
	});

})();

