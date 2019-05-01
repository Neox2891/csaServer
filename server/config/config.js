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

module.exports = {
    rezoned
}