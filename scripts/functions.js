import { arrowBack } from "./elements";
import { weatherContent } from "./elements";
import { alerts } from "./elements";
import { cityInput } from "./elements";
import { geoLocationBtn } from "./elements";
import { weatherImg } from "./elements";
import { weatherTemp } from "./elements";
import { weatherKind } from "./elements";
import { cityName } from "./elements";
import { subDegree } from "./elements";
import { humbPercent } from "./elements";

export const requestApi = function (entry) {
  if (entry.cod != "404") {
    gettingWeather();
    extractWeatherData(entry);
    switchMode();
  } else {
    reHideAllAlerts();
    alerts[1].innerHTML = `${cityInput.value} isn't a valid city name`;
    alerts[1].classList.remove("d-none");
  }
};
function switchMode() {
  if (arrowBack.classList.contains("d-none")) {
    arrowBack.classList.replace("d-none", "d-inline-block");
  }
  if (weatherContent.classList.contains("d-none")) {
    document.forms[0].classList.add("d-none");
    weatherContent.classList.replace("d-none", "d-flex");
  }
}
function extractWeatherData(data) {
  console.log(data);

  const dataObject = {
    cityName: data.name,
    country: data.sys.country,
    weather: {
      weatherId: data.weather[0].id,
      weatherdesc: data.weather[0].description,
    },
    tempture: {
      tempLike: data.main.feels_like,
      tempHumidity: data.main.humidity,
      temp: data.main.temp,
    },
  };
  weatherImg;
  weatherTemp.innerHTML = Math.floor(dataObject.tempture.temp);
  weatherKind.innerHTML = dataObject.weather.weatherdesc;
  cityName.innerHTML = dataObject.cityName + ", " + dataObject.country;
  subDegree.innerHTML = Math.floor(dataObject.tempture.tempLike);
  humbPercent.innerHTML = dataObject.tempture.tempHumidity + "%";
}

export const weatherONLocation = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, OnFaild);
  } else {
    alert("Unfortunately your browser doen't support Geo Location");
  }
};
function onSuccess(entry) {
  gettingWeather();
  const locationApi = `https://api.openweathermap.org/data/2.5/weather?lat=${entry.coords.latitude}&lon=${entry.coords.longitude}&units=metric&appid=64f2263ddfa313c8fea0d579f5ace610`;
  console.log();
  fetch(locationApi)
    .then((Response) => Response.json())
    .then(function (result) {
      extractWeatherData(result);
      switchMode();
    });
  reHideAllAlerts();
}
function OnFaild(entry) {
  reHideAllAlerts();
  alerts[0].innerHTML = entry.message;
  alerts[0].classList.remove("d-none");
}

function reHideAllAlerts() {
  alerts.forEach(function (item) {
    if (!item.classList.contains("d-none")) {
      item.classList.add("d-none");
    }
  });
}
function gettingWeather() {
  reHideAllAlerts();
  alerts[2].classList.remove("d-none");
}
