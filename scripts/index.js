import "../style/style.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { alerts, arrowBack, cityInput } from "./elements";
import { geoLocationBtn } from "./elements";
import { requestApi } from "./functions";
import { rsort } from "semver";
import { weatherONLocation } from "./functions";
import { Result } from "postcss";
import { switchNormal } from "./functions";

cityInput.addEventListener("keyup", function (e) {
  if (e.key == "Enter" && this.value) {
    const weatherDetail = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.value}&units=metric&appid=64f2263ddfa313c8fea0d579f5ace610`
    );
    weatherDetail
      .then((response) => response.json())
      .then((result) => requestApi(result));
  }
});

geoLocationBtn.addEventListener("click", weatherONLocation);

arrowBack.addEventListener("click", switchNormal);
