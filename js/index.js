'use strict';

const $ = document;

const inputElem = $.querySelectorAll('.inputElem');
const searchBtn = $.querySelectorAll('.searchBtn');
const defultCities = $.querySelectorAll('.links');

const apiConfig = {
  url: 'https://api.openweathermap.org/data/2.5/weather?q=',
  key: 'b7ddccde26a3f92d38560202eb5f6324',
};

window.onload = () => {
  getWeatherStatus('london');
};

const getWeatherStatus = (cityValue) => {
  if (cityValue === '') {
    alert('Please enter a city');
  } else {
    fetch(`${apiConfig.url}${cityValue}&appid=${apiConfig.key}`)
      .then((res) => res.json())
      .then((data) => showData(data))
      .catch((err) => {
        if (err.message === 'Failed to fetch') {
          alert(`Please check your internet or refresh the page`)
        } else {
          alert(`Please enter a valid city`)
        }
      });
  }
};

const showData = (data) => {
  // Complete Info
  const tempCity = $.querySelector('#temp');
  tempCity.innerHTML = `${Math.floor(data.main.temp - 273.15)}°`;

  const cityName = $.querySelector('#cityName');
  cityName.innerHTML = `${data.name}, ${data.sys.country}`;

  const date = $.querySelector('#date');
  date.innerHTML = showDate();

  const weatherImg = $.querySelector('#weatherImg');
  weatherImg.setAttribute('src', `/assets/img/icons/${data.weather[0].main.toLowerCase()}.svg`);
  weatherImg.setAttribute('alt', `${data.weather[0].main}`);

  const weatherStatus = $.querySelector('#weatherStatus');
  weatherStatus.innerHTML = `${data.weather[0].main}`;

  // Deatils Info
  const cloudy = $.querySelector('#cloudy');
  cloudy.innerHTML = `${data.clouds.all}%`;

  const humidity = $.querySelector('#humidity');
  humidity.innerHTML = `${data.main.humidity}%`;

  const wind = $.querySelector('#wind');
  wind.innerHTML = `${data.wind.speed}km/h`;

  const pressure = $.querySelector('#pressure');
  pressure.innerHTML = `${data.main.pressure}`;
};

function showDate() {
  const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const now = new Date();

  const getHours = now.getHours();
  const getMinutes = String(now.getMinutes()).padStart(2, '0');
  const getDayOfWeek = weekday[now.getDay()];
  const getDayOfMonth = now.getDate();
  const getMonth = month[now.getMonth()];
  const getYear = now.getFullYear().toString().slice(2, 4);

  return `${getHours}:${getMinutes} - ${getDayOfWeek}, ${getDayOfMonth} ${getMonth} '${getYear}`;
}

defultCities.forEach((link) => {
  link.addEventListener('click', (e) => {
    getWeatherStatus(e.target.innerHTML);
  });
});

inputElem.forEach((input) => {
  input.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
      getWeatherStatus(e.target.value);
      clearInput();
    }
  });
});

for (let i = 0; i < searchBtn.length; i++) {
  searchBtn[i].addEventListener('click', () => {
    let value = inputElem[i].value;
    getWeatherStatus(value);
    clearInput();
  });
}

function clearInput() {
  inputElem.forEach((input) => {
    input.value = '';
  });
}
