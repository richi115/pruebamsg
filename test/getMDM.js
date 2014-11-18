





var mdmdata = {"tty" : 6, "sta" : true, "imei" : 2743925664, "mdl" : "e303", "lst_use" : Date(), "grp" : 1 };

var mdm = new Mdm(mdmdata);

mdm.save(function(err, data){
	if(err){
		console.log(err);
	}
	else{
		console.log(data);
	}
});





Mdm.find({},function(err,data){
	console.log('Query a la BBDD');
	console.log(data);
});



//Mdm.findOne({'tty': 95},function(err,mdm){
//	console.log(mdm);
//});



