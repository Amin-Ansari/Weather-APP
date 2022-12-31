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
    setTimeout(function () {
      gettingWeather();
      extractWeatherData(entry);
      switchMode();
    }, 200);
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
  if (dataObject.weather.weatherId == 800) {
    weatherImg.src = "../images/weather icons/clear.svg";
  } else if (
    dataObject.weather.weatherId >= 200 &&
    dataObject.weather.weatherId <= 232
  ) {
    weatherImg.src = "../images/weather icons/storm.svg";
  } else if (
    dataObject.weather.weatherId >= 600 &&
    dataObject.weather.weatherId <= 622
  ) {
    weatherImg.src = "../images/weather icons/snow.svg";
  } else if (
    dataObject.weather.weatherId >= 701 &&
    dataObject.weather.weatherId <= 781
  ) {
    weatherImg.src = "../images/weather icons/cloud.svg";
  } else if (
    (dataObject.weather.weatherId >= 300 &&
      dataObject.weather.weatherId <= 321) ||
    (dataObject.weather.weatherId >= 500 && dataObject.weather.weatherId <= 521)
  ) {
    weatherImg.src = "../images/weather icons/rain.svg";
  }

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
  setTimeout(function () {
    const locationApi = `https://api.openweathermap.org/data/2.5/weather?lat=${entry.coords.latitude}&lon=${entry.coords.longitude}&units=metric&appid=64f2263ddfa313c8fea0d579f5ace610`;
    fetch(locationApi)
      .then((Response) => Response.json())
      .then(function (result) {
        extractWeatherData(result);
        switchMode();
      });
  }, 500);
}
function OnFaild(entry) {
  reHideAllAlerts();
  alerts[0].innerHTML = entry.message;
  alerts[0].classList.remove("d-none");
}

export function reHideAllAlerts() {
  alerts.forEach(function (item) {
    if (!item.classList.contains("d-none")) {
      item.classList.add("d-none");
    }
  });
}
export function gettingWeather() {
  reHideAllAlerts();
  alerts[2].classList.remove("d-none");
}

export function switchNormal() {
  cityInput.value = "";
  reHideAllAlerts();
  if (
    arrowBack.classList.contains("d-inline-block") ||
    weatherContent.classList.contains("d-flex")
  ) {
    arrowBack.classList.replace("d-inline-block", "d-none");
    weatherContent.classList.replace("d-flex", "d-none");
    document.forms[0].classList.remove("d-none");
  }
}
