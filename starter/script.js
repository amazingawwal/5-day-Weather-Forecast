var APIKey = "82282250414d5657cfa43fe7aba0f9ca";
var apiURL = "https://api.openweathermap.org/data/2.5/forecast?";
var searchString = "";

var todaysDate = dayjs().format("DD/MM/YYYY");

var displayLocation = document.querySelector("#location");

var searchBtn = document.querySelector("#search-button");
var searchValue = document.querySelector("#search-input");
var html = document.getElementsByTagName("body");
var tempK = document.querySelector("#current-temp");
var windEl = document.querySelector("#current-wind");
var humidityEl = document.querySelector("#current-humidity");
var forecastEl = document.querySelector("#forecast");

searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    console.log(searchValue.value);
    var queryURL = apiURL +  "q=" + searchValue.value + "&appid=" + APIKey;
    console.log(queryURL)
    searchValue.value = "";
// We then created an Fetch call
    fetch(queryURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        var icon = data.list[0].weather[0].icon;
        var pop = document.createElement("i");
        pop.className ="fas fa-"+ icon;
        document.body.appendChild(pop);
        displayLocation.appendChild(pop);
        console.log(pop)

        displayLocation.textContent = data.city.name + " ("+todaysDate+")"+icon;
        console.log("(",todaysDate,")")
        var tempKelvin = data.list[0].main.temp-273.15;
        var tempC = Math.round(tempKelvin*100)/100;
        console.log(tempC)
        tempK.textContent = "Temp: "+ tempC + ' \u00B0C';

        var wind = data.list[0].wind.speed;
        windEl.textContent ="Wind: "+ wind + " KPH";

        var humidity = data.list[0].main.humidity;
        humidityEl.textContent = "Humidity: " + humidity + "%";

        for (var i=1; i<6; i++){
            //create div for col
            var forecastDays = document.createElement("div");
            // add the class col
            forecastDays.classList.add("col");
            //append it to the section tag
            forecastEl.appendChild(forecastDays);
            //create h5 for date
            var dateEL = document.createElement("h5");
            var firstDate = data.list[i].dt_txt;
            dateEL.textContent = firstDate;

        };


    });

//console.log(searchValue)

});