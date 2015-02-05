/*

Configuracion de la aplicacion

*/

var config = {

DBURI: 'mongodb://localhost',  //ubicacion de la bbdd
DELAY_MDM: 30,	//segundo hasta volver a usar un modem
MSG_POR_MDM: 10, 	//Por cada iteracion se envian MSG_POR_MDM * cantidad de Modems
MDM_RESCAN : 5,  // volver a buscar los modems disponibles 
JOB_LIMIT : 50  //Cargar como maximo esta cantidad de jobs


//JOB_SYNC: 1000,	//cantidad de mensajes enviados hasta resync de jobs
//JOB_RELOAD: 500  //cantidad de mensajes enviados para buscar nuevos jobs

}

module.exports = config;
