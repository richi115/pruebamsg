/*

Configuracion de la aplicacion

*/

var config = {

DBURI: 'mongodb://localhost',  //ubicacion de la bbdd
DELAY_MDM: 30,	//segundo hasta volver a usar un modem
JOB_SIM: 4,		//cantidad de jobs simultaneos
//MSG_SIM: 10, 	//cantidad de mensajes enviados por iteracion
JOB_SYNC: 1000,	//cantidad de mensajes enviados hasta resync de jobs
JOB_RELOAD: 500  //cantidad de mensajes enviados para buscar nuevos jobs

}

module.exports = config;
