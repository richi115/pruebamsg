





var Schema = mongoose.Schema;

var mdmSchema = new Schema({
	tty: Number,			//nro usb del mdm
	sta: Boolean,			//estado del modem (ok, error)
	imei: Number,			//imei del modem
	mdl: String,			//modelo del modem
	lst_use: Date,			//timestamp del ultimo modem
	grp: Number			//grupo del modem
});

Mdm = mongoose.model('Mdm',mdmSchema);

module.exports = Mdm;


