//var config = require('./config/config');
var db = require('./db/db');
var modem = require('./models/modem');
//var job = require('./models/job');
var msg = require('./models/mensaje');


msg.insert_msg("+3455555","super nuevo",14,function(msgdata){
        console.log("insert_msg");
	console.log(msgdata);
});



msg.get_next_msg(14, function(msgdata){
        console.log("get_next_msg");
	console.log(msgdata);
});
