const API_KEY = "b0f95453d371d8c0bacf007d80e5b899";

const makeIconURL = (iconID) => `https://openweathermap.org/img/wn/${iconID}@2x.png`

const getFWeatherData = async (city, units = 'imperial') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

    const {weather,
    main: {temp, temp_min, feels_like, temp_max,
    humidity, pressure},
    wind: {speed},
    sys: {country},
    name,
    } = data;

    const {description, icon} = weather[0];

    return {
        description, 
        iconURL: makeIconURL(icon), 
        temp, 
        feels_like,  
        temp_max, 
        temp_min,
        speed, 
        humidity,
        pressure, 
        country,
        name,
    };
};

export { getFWeatherData };