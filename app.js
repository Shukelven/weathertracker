const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const apiKey = '089be0cc3cd235f6535dbbf8ce46c807';
const baseURL = `https://api.openweathermap.org/data/2.5/`;

const citySearch = document.querySelector('#citySearch');

const temperature = document.querySelector('.tempNumber h2');
const description = document.querySelector('.tempName p');
const humidity = document.querySelector('#humidityPer');
const airPressure = document.querySelector('#airPressureNum');
const wind = document.querySelector('#windNumber');
const visibility = document.querySelector('#visibleText');
const currentDay = document.querySelector('#currentDay');
const dayTitles = document.querySelectorAll('.dayTitle');
const currentLocationText = document.querySelector('.locationText p');

citySearch.addEventListener('submit', (e) => {
    e.preventDefault();
})

const getCurrentWeather = async (searchQuery) => {
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=buenos aires&appid=${apiKey}`);
    displayWeatherStats(res);
}

const displayWeatherStats = (response) => {
    temperature.textContent = response.data.main.temp;
    description.textContent = response.data.weather[0].description;

    humidity.textContent = `${response.data.main.humidity}%`;
    airPressure.textContent = `${response.data.main.pressure} mb`;
    wind.textContent = `${response.data.wind.speed} mph`;
    visibility.textContent = `${response.data.visibility} miles`;
    currentLocationText.textContent = `${response.data.name}`;

    const d = new Date();
    currentDay.textContent = `${week[d.getDay() - 1]}`;
}

getCurrentWeather()