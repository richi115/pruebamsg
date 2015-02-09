var ctrl = require('../controller/auxfunctions');

var data=
[ { usr: 'richi',
    inicio: 421742694,
    coment: 'Prueba 0',
    total_msg: 20,
    env_ok: 11,
    err_dst: 9,
    status: 0,
    metodo: 1,
    _id: '54be125889bc64c0153ec5b4',
    __v: 0 },
  { usr: 'perro',
    inicio: 1421742879,
    coment: 'Prueba 3',
    total_msg: 20,
    env_ok: 7,
    err_dst: 8,
    status: 0,
    metodo: 1,
    _id: '54be125889bc64c0153ec5b7',
    __v: 0 },
  { usr: 'enano',
    inicio: 1421743006,
    coment: 'Prueba 2',
    total_msg: 20,
    env_ok: 0,
    err_dst: 7,
    status: 0,
    metodo: 1,
    _id: '54be125889bc64c0153ec5b6',
    __v: 0 },
  { usr: 'churri123',
    inicio: 421103121,
    coment: 'Prueba 1',
    total_msg: 20,
    env_ok: 6,
    err_dst: 12,
    status: 0,
    metodo: 1,
    _id: '54be125889bc64c0153ec5b5',
    __v: 0 } ]
	
var msg=120
var res

res = ctrl.job_ponderar(data,msg)

console.log(res)

