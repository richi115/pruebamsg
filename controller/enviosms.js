var Modem = require('node-modem');


exports.enviosms = function(nromodem,mensaje,telefono,callback){
	var modem = new Modem(nromodem, function(err, data) {
		err && console.error(err);
	});

	modem.sequence([
	{
		command: 'AT+CMGS="'+telefono+'"',
		options: {
		expect: '>'
		}
	},
	{
	    command: mensaje,
		options: {
		  endline: Modem.ctrlZ
		}
	}
	], function(err) {
	err && console.error(err);
	modem.close(callback());
	});
}
