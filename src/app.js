function displayTemp(response){
    console.log(response.data);
    let temperatureElement= document.querySelector("#currentTemp");
    let cityElement=document.querySelector(".currentCity");
    let descriptionElement=document.querySelector(".currentWeather");
    let humidityElement=document.querySelector("#nowHum");
    let windElement=document.querySelector("#nowWind");
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    cityElement.innerHTML=response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
}

let apiKey="76d821d1d2a2ea449995354a4c66a73d";
let units="metric";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=Indianapolis&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemp);