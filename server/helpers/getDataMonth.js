let { getDataDay } = require('./getDataDay');

let getDataMonth = (sensorDb, monthInDays) => {
    
    let totalModulesTemperature = {
        temperatureM1: 0,
        temperatureM2: 0,
        temperatureM3: 0,
        temperatureM4: 0
    };
    
    let totalModulesHumidity = {
        humidityM1: 0,
        humidityM2: 0,
        humidityM3: 0,
        humidityM4: 0
    };

    let totalModulesAirQuality = {
        airQualityM1: 0,
        airQualityM2: 0,
        airQualityM3: 0,
        airQualityM4: 0
    };

    let monthDays = [];
    let monthsArray = [];
    let i = 1;
    // let iMonthDay = 0;

    while (i <= monthInDays) {
        monthDays.push(i);
        i++;
    }
    // console.log(monthDays);
    for (let index = 0; index < monthDays.length; index++) {
        let temporalArrayDay = [];
        const element = monthDays[index];
        // console.log(element);
        for (let index = 0; index < sensorDb.length; index++) {

            const sDb = sensorDb[index];
            if (element === sDb.date.day) {
                temporalArrayDay.push(sDb);
            }
        }

        let day = getDataDay(temporalArrayDay);
        
        // console.log('DAY TEMPERATURE M1: : ');
        // console.log(day.temperature.m1);
        
        day.temperature.m1.forEach(element => {
            totalModulesTemperature.temperatureM1 += element;
        });
        day.temperature.m2.forEach(element => {
            totalModulesTemperature.temperatureM2 += element;
        });
        day.temperature.m3.forEach(element => {
            totalModulesTemperature.temperatureM3 += element;
        });
        day.temperature.m4.forEach(element => {
            totalModulesTemperature.temperatureM4 += element;
        });
        
        day.humidity.m1.forEach(element => {
            totalModulesHumidity.humidityM1 += element;
        });
        day.humidity.m2.forEach(element => {
            totalModulesHumidity.humidityM2 += element;
        });
        day.humidity.m3.forEach(element => {
            totalModulesHumidity.humidityM3 += element;
        });
        day.humidity.m4.forEach(element => {
            totalModulesHumidity.humidityM4 += element;
        });

        day.airQuality.m1.forEach(element => {
            totalModulesAirQuality.airQualityM1 += element;
        });
        day.airQuality.m2.forEach(element => {
            totalModulesAirQuality.airQualityM2 += element;
        });
        day.airQuality.m3.forEach(element => {
            totalModulesAirQuality.airQualityM3 += element;
        });
        day.airQuality.m4.forEach(element => {
            totalModulesAirQuality.airQualityM4 += element;
        }); 
  
        let totalTemperatureModules = [];
        totalTemperatureModules.push(totalModulesTemperature.temperatureM1 / day.temperature.m1.length);
        totalTemperatureModules.push(totalModulesTemperature.temperatureM2 / day.temperature.m2.length);
        totalTemperatureModules.push(totalModulesTemperature.temperatureM3 / day.temperature.m3.length);
        totalTemperatureModules.push(totalModulesTemperature.temperatureM4 / day.temperature.m4.length);

        let totalHumidityModules = [];
        totalHumidityModules.push(totalModulesHumidity.humidityM1 / day.humidity.m1.length);
        totalHumidityModules.push(totalModulesHumidity.humidityM2 / day.humidity.m2.length);
        totalHumidityModules.push(totalModulesHumidity.humidityM3 / day.humidity.m3.length);
        totalHumidityModules.push(totalModulesHumidity.humidityM4 / day.humidity.m4.length);

        let totalAirQualityModules = [];
        totalAirQualityModules.push(totalModulesAirQuality.airQualityM1 / day.airQuality.m1.length);
        totalAirQualityModules.push(totalModulesAirQuality.airQualityM2 / day.airQuality.m2.length);
        totalAirQualityModules.push(totalModulesAirQuality.airQualityM3 / day.airQuality.m3.length);
        totalAirQualityModules.push(totalModulesAirQuality.airQualityM4 / day.airQuality.m4.length);

        
        //  console.log('TOTAL TEMPERATURE ARRAY: : ');
        //  console.log(totalTemperatureModules);
        let dayObject = {
            id: element,
            temperature: totalTemperatureModules,
            humidity: totalHumidityModules,
            airQuality: totalAirQualityModules,
            totalTemperature: day.totalTemperature,
            totalHumidity: day.totalHumidity,
            totalAirQuiality: day.totalAirQuality
        };
        
        if (day.temperature.m1.length !== 0) {
            monthsArray.push(dayObject);
        }

        totalModulesTemperature.temperatureM1 = 0;
        totalModulesTemperature.temperatureM2 = 0;
        totalModulesTemperature.temperatureM3 = 0;
        totalModulesTemperature.temperatureM4 = 0;

        totalModulesHumidity.humidityM1 = 0;
        totalModulesHumidity.humidityM2 = 0;
        totalModulesHumidity.humidityM3 = 0;
        totalModulesHumidity.humidityM4 = 0;

        totalModulesAirQuality.airQualityM1 = 0;
        totalModulesAirQuality.airQualityM2 = 0;
        totalModulesAirQuality.airQualityM3 = 0;
        totalModulesAirQuality.airQualityM4 = 0;
    }

    return {
        monthsArray
    }
}

module.exports = {
    getDataMonth
}