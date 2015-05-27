var SerialPort = require('serialport').SerialPort;



var options={
	baudrate: 9600
	}


var mdmasignado='/dev/ttyUSB0'

var sp=new SerialPort(mdmasignado,options)



sp.on("open", function () {
  console.log('open');
  sp.on('data', function(data) {
    console.log('data received: ' + data);
  });
  sp.write('at+cpin="1164"\n', function(err, results) {
    sp.write('at+cmgl=1\n', function(err, results) {
      sp.write('at+cmgs="634533103"\n', function(err, results) {
        sp.write('hola mundo\n', function(err, results) {
 		String.fromCharCode(26); 

});
});
});
});
});
