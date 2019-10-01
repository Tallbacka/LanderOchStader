//Inlämning Städer och länder Webbutveckling .Net

const cities = "json/stad.json";
const countries = "json/land.json";

document.getElementById('body').onload = function () {
    getCountryData();
    getCityData();
}

// Countries json data retrival
async function getCountryData() {
    let responseCountry = await fetch(countries);
    let countryData = await responseCountry.json()
    return countryData;
} getCountryData()
    .then(countryData => drawCountry(countryData))
    .then(countryData => { return countryData })
    .catch(err => console.log(err));

// Cities json data retrival
async function getCityData() {
    let responseCity = await fetch(cities);
    let cityData = await responseCity.json()
    return cityData;
} getCityData()
    .then(cityData => sortByPopulation(cityData))
    .then(cityData => drawCities(cityData))
    .catch(err => console.log(err));

// Appends the country buttons based on JSON data
function drawCountry(countryData) {
    var countryContainer = document.getElementById('countryBar');

    for (let i = 0; i < Object.values(countryData).length; i++) {
        var hr = document.createElement('hr')

        var a = document.createElement('a');
        a.setAttribute('class', "w3-button w3-center");
        a.setAttribute('onclick', "showCities(" + `'div${countryData[i].id}'` + ")")
        a.setAttribute('id', "countryButton")
        a.innerHTML = countryData[i].countryname;

        var divCountry = document.createElement('div');
        divCountry.setAttribute('class', "w3-container w3-center countryContainer");
        divCountry.setAttribute('id', countryData[i].id);
        
        var divCity = document.createElement('div');
        divCity.setAttribute('id', "div" + countryData[i].id);
        divCity.setAttribute('class', "w3-hide w3-container w3-center cityContainer");

        divCountry.appendChild(a);
        divCountry.appendChild(divCity);
        
        countryContainer.appendChild(divCountry)
        countryContainer.appendChild(hr)
    }
}

// Appends the city links based on JSON data
function drawCities(cityData) {
    var cityContainer = document.getElementsByClassName("cityContainer")


    for (let i = 0; i < cityContainer.length; i++) {
        for (let j = 0; j < cityData.length; j++) {
            var a = document.createElement('a');
            if (cityContainer[i].getAttribute("id") == "div"+cityData[j].countryid) {
                a.setAttribute('class', "w3-button " + cityData[i].id);
                a.setAttribute('id', "city" + cityData[j].countryid );
                a.innerHTML = cityData[j].stadname;

                cityContainer[i].appendChild(a)
            }
        }
    }
}

// Sorts the city data after population desc.
function sortByPopulation(cityData) {
    cityData.sort(function (a, b) { return b.population - a.population });
    return cityData;
}