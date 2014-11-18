var db = require('./db');
var modelos = require('./models');

var a,fecha;

for(i=0;i<100;i++){
	a=Math.random()*1000;
	fecha=parseInt(Date.now()/1000+a);
	imei=a^8;

	mdmdata ={"tty":i,"sta":1,"imei":imei,"mdl":"e303","lst_use":fecha,"grp":1};

	modelos.insert_mdm(mdmdata,function(data){
		console.log('TTY: ' + data.tty + ' Insertado OK');
	});
};


