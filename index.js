function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let humidityElement = document.querySelector("#humidity");
  let currentweatherElement = document.querySelector("#currentweather");
  let windElement = document.querySelector("#wind");
  let weatherImage = document.querySelector("#weatherImage");
  cityElement.innerHTML = response.data.city;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  currentweatherElement.innerHTML = response.data.condition.description;
  weatherImage.src = response.data.condition.icon_url;
  temperatureElement.innerHTML = temperature;
   getforecast(response.data.city);
}

function search(event) {
  event.preventDefault()
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function getforecast(city){
 let apiKey = "b2a5adcct04b33178913oc335f405433";
 let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
 
 axios(apiUrl).then(displayforecast)
}
 function displayforecast(response) {
 console.log(response.data)



  let forecast = document.querySelector("#forecast");
  
  response.data.daily.forEach(writeforecast);
}
function formatday(time){
  let date = new Date(time * 1000);
  let day =["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat",]

  return day[date.getDay()]
}


     function writeforecast(day,index) {
     if (index<5){forecast.innerHTML =
       forecast.innerHTML +
       `<span class="max temp">${Math.round(day.temperature.maximum)}°</span>
       </div>
        <strong>${Math.round(day.temperature.minimum)}°</strong>
        </div>
  
<img src="${day.condition.icon_url}"/>
        
      <div class="date">${formatday(day.time)}
       </div>
       </div>
       
      </div>`;}
     }
      

  