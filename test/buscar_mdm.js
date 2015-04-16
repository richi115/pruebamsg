var config = require('../config/config');
var mdm = require('../controller/gestionmdms');


var act_mdms=[]


mdm.load_mdm(function(datosmodems){
	act_mdms=datosmodems
})
	
	
res=mdm.get_nxt_mdm(act_mdms)



console.log(act_mdms[res.i])
console.log('Indice elegido: '+res.i)
console.log('Valor elegido: '+res.lst_use)


console.log(act_mdms)


