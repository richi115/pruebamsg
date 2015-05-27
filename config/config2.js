/*

Configuracion de la aplicacion

*/

var config = {

DBURI: 'mongodb://localhost',  //ubicacion de la bbdd
DELAY_MDM: 30,	//segundo hasta volver a usar un modem
MSG_POR_MDM: 10, 	//Por cada iteracion se envian MSG_POR_MDM * cantidad de Modems
MDM_RESCAN : 5,  // volver a buscar los modems disponibles 
JOB_LIMIT : 10  //Cargar como maximo esta cantidad de jobs


}

module.exports = config;
