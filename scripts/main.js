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
        var button = document.createElement('button');
        button.setAttribute('class', "w3-bar-item w3-button tablink");
        button.setAttribute('id', countryData[i].id);
        button.setAttribute('onclick', "openCountry(event, this(id))");
        button.innerHTML =countryData[i].countryname;
        countryContainer.insertAdjacentElement("afterbegin", button)
    }
}

// Appends the city links based on JSON data
function drawCities(cityData) {
    

    for (let i = 0; i < dropdown.length; i++) {
        for (let j = 0; j < Object.values(cityData).length; j++) {
            var a = document.createElement('a');

            if (dropdown[i].getAttribute("id") == cityData[j].countryid) {
                
            } else {
                console.log("nothing in common");
            }
        }
    }
}


// Sorts the city data after population desc.
function sortByPopulation(cityData) {
    cityData.sort(function (a, b) { return b.population - a.population });
    return cityData;
}