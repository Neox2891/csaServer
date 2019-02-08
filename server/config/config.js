// Configuracion zonaHoraria
let { DateTime } = require('luxon');

let rezoned = () => {

    let local = DateTime.local();
    let timeZone = local.setZone('America/Bogota');
    let date = timeZone.toString().split('T');

    return {
        date,
        day: timeZone.day,
        month: timeZone.month,
        year: timeZone.year,
        hour: timeZone.hour,
        minute: timeZone.minute
    }
}

//Configuracion del puerto
process.env.PORT = process.env.PORT || 3000;

//Configuracion del entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

process.env.CADUCIDAD_TOKEN = '48h';

/**
* SEED de autenticación
*/
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//Configuracion base de datos
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/csaDB';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

module.exports = {
    rezoned
}