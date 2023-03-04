function formatData(timestamp){
let date =new Date(timestamp);
let hours = date.getHours();
if (hours<10){
    hours=`0${hours}`;
}
let minutes=date.getMinutes();
if (minutes<10){
    minutes=`0${minutes}`;
}
let days=[
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"]
let day= days[date.getDay()];
return `${day} ${hours}:${minutes} `


}

function formatDay(timestamp){
let date =new Date (timestamp*1000);
let day= date.getDay();
let days= [
    "San",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
]
return days[day];
}

function displayForecast(response){
   
    let forecast = response.data.daily;
    let forecastElement=document.querySelector("#forecast");
    let forecastHTML=`<div class="row">`;
    
    forecast.forEach(function (forecastDay,index){
if (index <6){


    
forecastHTML=forecastHTML+
    `
                <div class="col-2">
                    <div class="weather-forecast-date">
                    ${formatDay (forecastDay.time)}
                </div>
               
                    <img src="${forecastDay.condition.icon_url}" 
                    alt=""
                    width="42"
                    />
                    <div class="weather-forecast-temperature">
                   <span class="weather-forecast-temperature-max"> 
                    ${Math.round(forecastDay.temperature.maximum)}°</span>
                   <span class="weather-forecast-temperatura-min">
                    ${Math.round(forecastDay.temperature.minimum)}° </span>
                </div>
                </div>`;
}
            })
            forecastHTML=forecastHTML+`</div`;
            forecastElement.innerHTML=forecastHTML;
       
        }
        function getForecast(coordinates){
          console.log(coordinates);
            let apiKey="27eca4fao6df830t6cbc3314b08c2e4a";
            let apiUrl=`https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
            console.log(apiUrl);
            axios.get(apiUrl).then(displayForecast);
        }
function displayTemperature(response){
 
let temperatureElement=document.querySelector("#temperature");
let cityElement=document.querySelector("#city");
let descriptionElement=document.querySelector("#description");
let humidityElement=document.querySelector("#humidity");
let windElement=document.querySelector("#wind");
let dataElement=document.querySelector("#date");
let iconElement=document.querySelector("#icon");

celcsiusTemperature = response.data.temperature.current;

temperatureElement.innerHTML= Math.round(celcsiusTemperature);
cityElement.innerHTML= (response.data.city);
descriptionElement.innerHTML= (response.data.condition.description);
humidityElement.innerHTML= (response.data.temperature.humidity);
windElement.innerHTML= Math.round(response.data.wind.speed);
dataElement.innerHTML=formatData(response.data.time*1000);
iconElement.setAttribute("src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`)
iconElement.setAttribute("alt", response.data.condition.description);

getForecast(response.data.coordinates);
}
function search(city){
    let apiKey= "27eca4fao6df830t6cbc3314b08c2e4a";
    let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}


function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input").value;
    search(cityInputElement);
  }
function displayFahrenheitTemperature (event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    celsiusLinnk.classList.remove("active");
    fahrenheitLinnk.classList.add("active");
    let fahrenheitTemperature= (celcsiusTemperature*9)/5+32;
    temperatureElement.innerHTML=Math.round(fahrenheitTemperature);

}
function displayCelsiusTemperature(event){
    event.preventDefault();
    celsiusLinnk.classList.add("active");
    fahrenheitLinnk.classList.remove("active");
    let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(celcsiusTemperature);
}
let celcsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


let fahrenheitLinnk=document.querySelector("#fahrenheit-link");
fahrenheitLinnk.addEventListener("click", displayFahrenheitTemperature);

let celsiusLinnk=document.querySelector("#celsius-link");
celsiusLinnk.addEventListener("click", displayCelsiusTemperature);

search("Oslo");
