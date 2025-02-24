// function for live location Weather

// function for searched city

function GetWeather() {
  let city = document.getElementById("city").value;
  const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=95946199dc683b09c7e5745c682c2a6c`;
  fetch(cityUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      console.log(res);
      showData(res);
      console.log(res.coord.lat);
      console.log(res.main.temp);
      console.log(res.coord.lon);
      getWeather7Day(res.coord.lat, res.coord.lon);
    })
    .catch(function (err) {
      console.log(err);
    });
}

// function to show the data

function showData(data) {
  let map = document.querySelector("#gmap_canvas");
  map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  document.querySelector(".wheatherData").innerText = " ";
  let main = document.querySelector(".wheatherData");

  // giving the style
  main.style.boxShadow = "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px inset";
  main.style.border = "1px solid white";

  let card = document.createElement("div");
  card.setAttribute("class", "card");

  let name = document.createElement("p");
  name.innerText = `Name:- ${data.name}`;

  let temp = document.createElement("p");
  temp.innerText = `Current Temperture :- ${Math.round(
    data.main.temp - 273
  )} °C`;

  let temp_min = document.createElement("p");
  temp_min.innerText = `Minimum Temperture :- ${Math.round(
    data.main.temp_min - 273
  )} °C`;

  let temp_max = document.createElement("p");
  temp_max.innerText = `Maximum Temperture :- ${Math.round(
    data.main.temp_max - 273
  )} °C`;

  let humidity = document.createElement("p");
  humidity.innerText = `Humidity :- ${data.main.humidity}`;

  let wind = document.createElement("p");
  wind.innerText = `Wind :- ${data.wind.speed} km/h`;

  let sunrise = document.createElement("p");

  let sunset = document.createElement("p");

  // setting the time of sunset and sunrise

  const unixTime = data.sys.sunrise;
  let date = new Date(unixTime * 1000);

  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  sunrise.innerText = `Sunrise Date : ${date.toLocaleDateString(
    "en-US"
  )} Time : ${formattedTime}`;

  const unixTime1 = data.sys.sunset;
  const date1 = new Date(unixTime1 * 1000);

  var hours = date1.getHours();
  var minutes = "0" + date1.getMinutes();
  var seconds = "0" + date1.getSeconds();
  var formattedTime1 =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  sunset.innerText = `Sunset Date : ${date1.toLocaleDateString(
    "en-US"
  )} Time : ${formattedTime1}`;

  card.append(name, temp, temp_max, temp_min, sunrise, sunset, wind, humidity);
  document.querySelector(".wheatherData").append(card);
}
function GetByLocation(lat, lon) {
  const locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=95946199dc683b09c7e5745c682c2a6c`;
  fetch(locationUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      console.log(res);
      showData(res);
    });
}

function getWeather7Day(lat, lon) {
  const url7 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=e55facf0266aa7ab8e4ca33d3e6833c6`;
  fetch(url7)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      console.log(res.daily);
      append7Day(res.daily);
    })
    .catch(function (err) {
      console.log("Err :-", err);
    });
}

function append7Day(content) {
  let main = document.querySelector(".div7");
  main.innerText = null;
  document.querySelector("#text7").innerText =
    "Whether Forecast For Next 7 Day";
  let i = 0;
  content.map(function (elem) {
    if (i == 0) {
    } else {
      let box = document.createElement("div");
      box.setAttribute("id", "foreBox");

      box.style.boxShadow = "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px inset";
      box.style.border = "1px solid white";

      let dateBox = document.createElement("p");
      const unixTime = elem.dt;
      const date = new Date(unixTime * 1000);
      dateBox.innerText = `Date : ${date.toLocaleDateString("en-US")}`;

      let temp = document.createElement("p");
      temp.innerText = `Temp : ${Math.round(elem.temp.day - 273)}°C`;

      let maxTemp = document.createElement("p");
      maxTemp.innerText = `Maximum Temp : ${Math.round(elem.temp.max - 273)}°C`;

      let minTemp = document.createElement("p");
      minTemp.innerText = `Minimum Temp : ${Math.round(elem.temp.min - 273)}°C`;

      let humidity = document.createElement("p");
      humidity.innerText = `Humidity : ${elem.humidity}`;

      let img = document.createElement("img");
      img.setAttribute("id", "wheImg");
      img.src = `https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`;

      box.append(dateBox, img, temp, maxTemp, minTemp, humidity);
      main.append(box);
    }
    i++;
  });
}

function getloc() {
  navigator.geolocation.getCurrentPosition(success);

  function success(position) {
    let crd = position.coords;

    GetByLocation(crd.latitude, crd.longitude);

    getWeather7Day(crd.latitude, crd.longitude);
  }
}
