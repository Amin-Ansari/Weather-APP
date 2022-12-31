import "../style/style.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { cityInput } from "./elements";
import { geoLocationBtn } from "./elements";
import { requestApi } from "./functions";
import { rsort } from "semver";

cityInput.addEventListener("keyup", function (e, cityName) {
  if (e.key == "Enter" && this.value) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=64f2263ddfa313c8fea0d579f5ace610`
    )
      .then((Response) => Response.json())
      .then((result) => requestApi(result));
  }
});
