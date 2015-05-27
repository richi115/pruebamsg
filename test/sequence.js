/**
 * Created by vrut on 22/09/14.
 */

var Modem = require('../');
var async = require('async');
var mensaje = process.argv[2]


var modem = new Modem('/dev/ttyUSB1', function(err, data) {
  err && console.error(err);
});

// sequence
modem.sequence([
  {
    command: 'AT+CMGS="+34634533103"',
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
  console.log('done');
  modem.close();
});
