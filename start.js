//var config = require('./config/config');
var db = require('./db/db');
var modem = require('./models/modem');
var job = require('./models/job');
var msg = require('./models/mensaje');



job.load_job(function(jobdata){
        console.log('ok' + jobdata[3].usr);
	//console.log(jobdata);
});



/*
msg.get_next_msg(14, function(msgdata){
        console.log("get_next_msg");
	console.log(msgdata);
});

*/
