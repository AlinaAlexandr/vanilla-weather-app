function displayTemperature(response){
console.log(response.data);
let temperatureElement=document.querySelector("#temperature");
let cityElement=document.querySelector("#city");
temperatureElement.innerHTML= Math.round(response.data.temperature.current);
cityElement.innerHTML= (response.data.city);
let descriptionElement=document.querySelector("#description");
descriptionElement.innerHTML= (response.data.condition.description);
let humidityElement=document.querySelector("#humidity");
humidityElement.innerHTML= (response.data.temperature.humidity);
let windElement=document.querySelector("#wind");
windElement.innerHTML= Math.round(response.data.wind.speed);
}
let apiKey= "27eca4fao6df830t6cbc3314b08c2e4a";
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=New York&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);