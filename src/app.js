function formatDate(timestamp){
    let date= new Date(timestamp);
    let hours = date.getHours();
     if (hours < 10){
        hours= `0${hours}`;
    }
    let minutes=date.getMinutes();
    if (minutes < 10){
        minutes= `0${minutes}`;
    }
    let days=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day= days[date.getDay()];
    return `${day} ${hours}:${minutes}`; 
}

function formatDay(timestamp){
    let date=new Date(timestamp*1000);
    let day=date.getDay();
    let days=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
}

function displayForecast(response){
    let forecast=response.data.daily;
    let forecastElement=document.querySelector("#forecast"); 
      
    let forecastHTML=`<div class="row">`;
    forecast.forEach(function(forecastDay, index){
        if (index<6){
        forecastHTML= forecastHTML+` 
          <div class ="col-2">
            <div class="weatherForecastDay" id="dayOne">${formatDay(forecastDay.dt)}</div>
            <img class= "weatherForecastIcon" id="dayOneIcon" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="42"/>
            <div class= "weatherForecastTemp">
              <span class="weatherForecastHigh" id="dayOneHigh">${Math.round(forecastDay.temp.max)}°</span>
               <span class="weatherForecastLow" id="dayOneLow">${Math.round(forecastDay.temp.min)}°</span></div>
          </div>`;
        }
    });
    forecastHTML=forecastHTML+`</div>`;
    forecastElement.innerHTML=forecastHTML;
}    

function getForecast(coordinates){
    console.log(coordinates);
    let apiKey="76d821d1d2a2ea449995354a4c66a73d";
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response){
    console.log(response.data);
    let temperatureElement= document.querySelector("#currentTemp");
    let cityElement=document.querySelector(".currentCity");
    let descriptionElement=document.querySelector(".currentWeather");
    let humidityElement=document.querySelector("#nowHum");
    let windElement=document.querySelector("#nowWind");
    let dateElement=document.querySelector("#current-dts");
    let emojiElement=document.querySelector("#currentEmoji");

    celsiusTemperature=response.data.main.temp;

    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    cityElement.innerHTML=response.data.name;
    descriptionElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.dt *1000);
    emojiElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    getForecast(response.data.coord);

}

function search(city){
    let apiKey="76d821d1d2a2ea449995354a4c66a73d";
    let units="metric";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value);
}

let form=document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayFarenheit(event){
    event.preventDefault();
    let farenheitTemperature=(celsiusTemperature*9) /5 +32;
    let temperatureElement=document.querySelector("#currentTemp");
    celsiusLink.classList.remove("active");
    farenheitLink.classList.add("active");
    temperatureElement.innerHTML=Math.round(farenheitTemperature);
}

function displayCelsius(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#currentTemp");
   celsiusLink.classList.add("active");
   farenheitLink.classList.remove("active");
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
}

let celsiusTemperature=null;

let celsiusLink=document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

let farenheitLink=document.querySelector("#farenheit");
farenheitLink.addEventListener("click", displayFarenheit);

search("Indianapolis");
