var APIKey = "82282250414d5657cfa43fe7aba0f9ca";
var apiURL = "https://api.openweathermap.org/data/2.5/forecast?";
var searchString = "";

var todaysDate = dayjs().format("DD/MM/YYYY");

var displayLocation = document.querySelector("#location");
var buttonGroup = document.querySelector("#btn-group")
var searchBtn = document.querySelector("#search-form");
var searchValue = document.querySelector("#search-input");
var html = document.getElementsByTagName("body");
var tempK = document.querySelector("#current-temp");
var windEl = document.querySelector("#current-wind");
var humidityEl = document.querySelector("#current-humidity");
var forecastEl = document.querySelector("#forecast");
var inputListEl = document.querySelector("#input-list");
var cityHistory = JSON.parse(localStorage.getItem('cities')) || []

function start(e) {
    e.preventDefault();
    runAPI(searchValue.value)
    searchValue.value = "";
    forecastEl.innerHTML = "";
}

function runAPI(userInput) {
    var queryURL = apiURL + "q=" + userInput + "&appid=" + APIKey;
    
    //  create a Fetch call
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var icon = data.list[0].weather[0].icon;
            var pop = document.createElement("i");
            pop.innerHTML = "<img src=http://openweathermap.org/img/wn/" + icon + "@2x.png>";


            console.log(pop)

            displayLocation.textContent = data.city.name + " (" + todaysDate + ")";
            displayLocation.appendChild(pop);
            console.log("(", todaysDate, ")")
            var tempKelvin = data.list[0].main.temp - 273.15;
            var tempC = Math.round(tempKelvin * 100) / 100;
            console.log(tempC)
            tempK.textContent = "Temp: " + tempC + ' \u00B0C';

            var wind = data.list[0].wind.speed;
            windEl.textContent = "Wind: " + wind + " KPH";

            var humidity = data.list[0].main.humidity;
            humidityEl.textContent = "Humidity: " + humidity + "%";

            

            for (var i = 4; i < data.list.length; i += 8) {
                //create div for col
                var forecastDays = document.createElement("div");
                // add the class col
                forecastDays.classList.add("col", "forecast-day");
                //append div col to the section tag
                forecastEl.appendChild(forecastDays);
                //create h5 for date
                var dateEL = document.createElement("h5");
                //get date from API
                var firstDate = data.list[i].dt_txt;
                firstDate = dayjs(firstDate).format("DD/MM/YYYY")
                console.log(firstDate)
                // add date to dateEl
                dateEL.textContent = firstDate;

                //create i tag for icon
                var iconEl = document.createElement("i");
                var weatherIcon = data.list[i].weather[0].icon;
                //iconEl.classList.add("fas fa-"+ weatherIcon);
                iconEl.innerHTML = "<img src=http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png>";

                // add temp forecast
                var tempEl = document.createElement("p");
                var newTempKelvin = data.list[i].main.temp - 273.15;
                var newTempC = Math.round(newTempKelvin * 100) / 100;
                tempEl.textContent = "Temp: " + newTempC + ' \u00B0C';

                // add wind forecast
                var windForecastEl = document.createElement("p");
                var windForecast = data.list[i].wind.speed;
                windForecastEl.textContent = "Wind: " + windForecast + " KPH";


                //add humidity forecast
                var humidityForecastEl = document.createElement("p");
                var humidityForecast = data.list[i].main.humidity;
                humidityForecastEl.textContent = "Humidity: " + humidityForecast + "%";




                // append all forecast elements to div col
                $(forecastDays).append(dateEL, iconEl, tempEl, windForecastEl, humidityForecastEl);



            };

            addToLocalStorage(data.city.name);

        });
}


function addToLocalStorage(city) {
    // this function will take the city and add it to the array of cities in local storage
    if (!cityHistory.includes(city)) {
        cityHistory.push(city)
        localStorage.setItem('cities', JSON.stringify(cityHistory))
        // this will need to creat the button that will attach to container (make it its own function)
        createButtons(city)
    }

}

function createButtons(city) {
    var locationButton = document.createElement("button");
    locationButton.textContent = city;
    locationButton.classList.add("button");
    locationButton.addEventListener('click', searchHistoryBtn)
    inputListEl.appendChild(locationButton);
}

function searchHistoryBtn(e) {
    runAPI(e.target.textContent)
    forecastEl.innerHTML = "";
}


for(var j=0; j<cityHistory.length; j++){
    createButtons(cityHistory[j])
};





// cityHistory.forEach(function (city) {
//     createButtons(city)
// })





searchBtn.addEventListener("submit", start)