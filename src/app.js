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
let dataElement=document.querySelector("#date");
dataElement.innerHTML=formatData(response.data.time*1000);
}
let apiKey= "27eca4fao6df830t6cbc3314b08c2e4a";
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=New York&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);