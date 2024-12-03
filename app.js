import config from './config.js';

const date = document.getElementById('date');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const tempImg = document.getElementById('tempImg');
const description = document.getElementById('description');
const tempMax = document.getElementById('tempMax');
const tempMin = document.getElementById('tempMin');

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let dateObj = new Date();
let month = months[dateObj.getUTCMonth()];
let day = dateObj.getUTCDate() - 1;
let year = dateObj.getUTCFullYear();

date.innerHTML = `${month} ${day}, ${year}`;

const app = document.getElementById('app');

const getWeather = async () => {
    try {
        const cityName = document.getElementById('searchBarInput').value;
        console.log(cityName);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${config.apiKey}&units=metric`, {
            headers: {
                Accept: 'application/json'
            }
        });

        const data = await response.json();
        
        city.innerHTML = `${data.name}`;
        description.innerHTML = `${data.weather[0].main}`;
        tempImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png"/>`;
        temp.innerHTML = `<h2>${Math.floor(data.main.temp)}˚C</h2>`
        tempMax.innerHTML = `${Math.floor(data.main.temp_max)}˚C`;
        tempMin.innerHTML = `${Math.floor(data.main.temp_min)}˚C`;
    } catch (error) {
        console.log(error);
    }
}

window.getWeather = getWeather;