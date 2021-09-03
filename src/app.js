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
}

function search(city){
    let apiKey="76d821d1d2a2ea449995354a4c66a73d";
let units="metric";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=Indianapolis&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFarenheit(event){
    event.preventDefault();
    let farenheitTemperature=(17*9) /5 +32;
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

let form=document.querySelector("#search-form");
form.addEventListener("submit", search);

let celsiusLink=document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

let farenheitLink=document.querySelector("#farenheit");
farenheitLink.addEventListener("click", displayFarenheit);

search("Indianapolis");