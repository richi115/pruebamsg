var serialport = require('serialport');
var sp = serialport.SerialPort;

serialport.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
  });
});
