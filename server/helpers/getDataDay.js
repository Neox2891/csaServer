const getDataDay = (sensorDb) => {

    let moduleTemperature = {
        m1: [],
        m2: [],
        m3: [],
        m4: [],
    };
    let moduleHumidity = {
        m1: [],
        m2: [],
        m3: [],
        m4: [],
    };
    let moduleAirQuality = {
        m1: [],
        m2: [],
        m3: [],
        m4: [],
    };
    let totalRelativeTemperature = [];
    let totalRelativeHumidity = [];
    let totalRelativeAirQuality = [];
    let hours = [];
    let totalTemperature = [],
        totalHumidity = [],
        totalAirQuality = [],
        totalTemperatureContainer = 0,
        totalHumidityContainer = 0,
        totalAirQualityContainer = 0;

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

    sensorDb.forEach(element => {

        hours.push(element.date.hours.toString().concat(':', element.date.minutes));

        moduleTemperature.m1.push(element.temperature[0]);
        totalModulesTemperature.temperatureM1 += element.temperature[0];
        moduleTemperature.m2.push(element.temperature[1]);
        totalModulesTemperature.temperatureM2 += element.temperature[1];
        moduleTemperature.m3.push(element.temperature[2]);
        totalModulesTemperature.temperatureM3 += element.temperature[2];
        moduleTemperature.m4.push(element.temperature[3]);
        totalModulesTemperature.temperatureM4 += element.temperature[3];

        moduleHumidity.m1.push(element.humidity[0]);
        totalModulesHumidity.humidityM1 += element.humidity[0];
        moduleHumidity.m2.push(element.humidity[1]);
        totalModulesHumidity.humidityM2 += element.humidity[1];
        moduleHumidity.m3.push(element.humidity[2]);
        totalModulesHumidity.humidityM3 += element.humidity[2];
        moduleHumidity.m4.push(element.humidity[3]);
        totalModulesHumidity.humidityM4 += element.humidity[3];

        moduleAirQuality.m1.push(element.airQuality[0]*100/1000);
        totalModulesAirQuality.airQualityM1 += element.airQuality[0];
        moduleAirQuality.m2.push(element.airQuality[1]*100/1000);
        totalModulesAirQuality.airQualityM2 += element.airQuality[1];
        moduleAirQuality.m3.push(element.airQuality[2]*100/1000);
        totalModulesAirQuality.airQualityM3 += element.airQuality[2];
        moduleAirQuality.m4.push(element.airQuality[3]*100/1000);
        totalModulesAirQuality.airQualityM4 += element.airQuality[3];

        let temperatureArray = [],
            humidityArray = [],
            airQualityArray = [],
            temperatureContainer = 0,
            humidityContainer = 0,
            airQualityContainer = 0;

        for (let i = 0; i < element.temperature.length; i++) {

            totalTemperature.push(element.temperature[i]);
            totalTemperatureContainer += element.temperature[i];
            temperatureArray.push(element.temperature[i]);

            if (temperatureArray.length === 4) {

                temperatureContainer = 0;
                for (let i = 0; i < temperatureArray.length; i++) {
                    temperatureContainer += temperatureArray[i];
                }
                totalRelativeTemperature.push(temperatureContainer / 4);
                temperatureArray = [];
            }
        }


        element.humidity.forEach((humidityDb, index) => {
            totalHumidity.push(humidityDb);
            totalHumidityContainer += humidityDb;
            humidityArray.push(element.humidity[index]);

            if (humidityArray.length === 4) {

                humidityContainer = 0;
                for (let i = 0; i < humidityArray.length; i++) {
                    humidityContainer += humidityArray[i];
                }
                totalRelativeHumidity.push(humidityContainer / 4);
                humidityArray = [];
            }
        });

        element.airQuality.forEach((airQualityDb, index) => {
            totalAirQuality.push(airQualityDb);
            totalAirQualityContainer += airQualityDb;
            airQualityArray.push(element.airQuality[index]);

            if (airQualityArray.length === 4) {

                airQualityContainer = 0;
                for (let i = 0; i < airQualityArray.length; i++) {
                    airQualityContainer += airQualityArray[i];
                }
                totalRelativeAirQuality.push((airQualityContainer / 4) * 100 / 1000);
                airQualityArray = [];
            }
        });
    });

    totalDayModules({ totalModulesTemperature, moduleTemperature }, 
                    {totalModulesHumidity, moduleHumidity},
                     {totalModulesAirQuality, moduleAirQuality});

    

    return {
        temperature: moduleTemperature,
        humidity: moduleHumidity,
        airQuality: moduleAirQuality,
        totalModules: {
            temperature: totalRelativeTemperature,
            humidity: totalRelativeHumidity,
            airQuality: totalRelativeAirQuality
        },        
        totalTemperature: totalTemperatureContainer / totalTemperature.length,
        totalHumidity: totalHumidityContainer / totalHumidity.length,
        totalAirQuality: (totalAirQualityContainer / totalAirQuality.length) * 100 / 1000,
        hours
    }

}

let totalDayModules =  (temperature, humidity, airQuality) => {

    let totalTemperatureModules = [];
    totalTemperatureModules.push(temperature.totalModulesTemperature.temperatureM1 / temperature.moduleTemperature.m1.length);
    totalTemperatureModules.push(temperature.totalModulesTemperature.temperatureM2 / temperature.moduleTemperature.m2.length);
    totalTemperatureModules.push(temperature.totalModulesTemperature.temperatureM3 / temperature.moduleTemperature.m3.length);
    totalTemperatureModules.push(temperature.totalModulesTemperature.temperatureM4 / temperature.moduleTemperature.m4.length);

    let totalHumidityModules = [];
    totalHumidityModules.push(humidity.totalModulesHumidity.humidityM1 / humidity.moduleHumidity.m1.length);
    totalHumidityModules.push(humidity.totalModulesHumidity.humidityM2 / humidity.moduleHumidity.m2.length);
    totalHumidityModules.push(humidity.totalModulesHumidity.humidityM3 / humidity.moduleHumidity.m3.length);
    totalHumidityModules.push(humidity.totalModulesHumidity.humidityM4 / humidity.moduleHumidity.m4.length);

    let totalAirQualityModules = [];
    totalAirQualityModules.push((airQuality.totalModulesAirQuality.airQualityM1 / airQuality.moduleAirQuality.m1.length) * 100 / 1000);
    totalAirQualityModules.push((airQuality.totalModulesAirQuality.airQualityM2 / airQuality.moduleAirQuality.m2.length) * 100 / 1000);
    totalAirQualityModules.push((airQuality.totalModulesAirQuality.airQualityM3 / airQuality.moduleAirQuality.m3.length) * 100 / 1000);
    totalAirQualityModules.push((airQuality.totalModulesAirQuality.airQualityM4 / airQuality.moduleAirQuality.m4.length) * 100 / 1000);

    return {
        totalTemperatureModules,
        totalHumidityModules,
        totalAirQualityModules
    }

}

module.exports = {
    getDataDay,
    totalDayModules
}