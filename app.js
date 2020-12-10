const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const apiKey = '089be0cc3cd235f6535dbbf8ce46c807';
const baseURL = `https://api.openweathermap.org/data/2.5/`;
const iconURL = 'http://openweathermap.org/img/w/';

const citySearchInput = document.querySelector('#citySearch');
const temperature = document.querySelector('.tempNumber h2');
const description = document.querySelector('.tempName p');
const humidity = document.querySelector('#humidityPer');
const airPressure = document.querySelector('#airPressureNum');
const wind = document.querySelector('#windNumber');
const windUnit = document.querySelector('.windUnit');
const visibility = document.querySelector('#visibleText');
const currentDay = document.querySelector('#currentDay');
const dayTitles = document.querySelectorAll('.dayTitle');
const currentLocationText = document.querySelector('.locationText p');
const unitText = document.querySelector('.unitText');
const celsiusBtn = document.querySelector('#celsius');
const fahrenheitBtn = document.querySelector('#fahrenheit');
const weatherIcon = document.querySelector('.weatherIcon img');

let lat;
let long;

const toggleDiv = document.querySelector('.tempToggle');

windUnit.textContent = 'mps';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getCurrentWeather(citySearchInput.value, 'metric');

    citySearchInput.value = '';
})

toggleDiv.addEventListener('click', (e) => {
    if(e.target.textContent === 'F') {
        fahrenheitBtn.classList.add('active');
        celsiusBtn.classList.remove('active');
        getCurrentWeather(currentLocationText.textContent, 'imperial');
        unitText.textContent = '°F';
        windUnit.textContent = 'mph';
    } else if(e.target.textContent === 'C') {
        fahrenheitBtn.classList.remove('active');
        celsiusBtn.classList.add('active');
        getCurrentWeather(currentLocationText.textContent, 'metric');
        unitText.textContent = '°C';
        windUnit.textContent = 'mps';
    }
})

const currentLocationWeather = async () => {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`);
    displayWeatherStats(res);
    console.log(res.data);
}

const getCurrentWeather = async (searchQuery, unit) => {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=${unit}&appid=${apiKey}`);
    displayWeatherStats(res);
    console.log(res.data);
}

const displayWeatherStats = (response) => {
    temperature.textContent = response.data.main.temp;
    description.textContent = response.data.weather[0].description;

    humidity.textContent = `${response.data.main.humidity}%`;
    airPressure.textContent = `${response.data.main.pressure} mb`;
    wind.textContent = `${response.data.wind.speed} ${windUnit.textContent}`;
    visibility.textContent = `${response.data.visibility} miles`;
    currentLocationText.textContent = `${response.data.name}`;

    const d = new Date();
    currentDay.textContent = `${week[d.getDay() - 1]}`;
    weatherIcon.attributes[0].value = `${iconURL}${response.data.weather[0].icon}.png`;
}

// getCurrentWeather('buenos aires', 'metric')
navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    currentLocationWeather()
})

console.dir(weatherIcon.attributes[0].value);