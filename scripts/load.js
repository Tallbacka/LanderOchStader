//Övning Städer och länder Webbutveckling .Net

const cities = "json/stad.json";
const countries = "json/land.json";

function initialize () {
    getCityData();
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


// Sorts the city data after population desc.
function sortByPopulation(cityData) {
    cityData.sort(function (a, b) { return b.population - a.population });
    return cityData;
}

// Appends the country buttons based on JSON data
function drawCountry(countryData) {
    var countryContainer = document.getElementById('countryContainer');

    for (let i = 0; i < Object.values(countryData).length; i++) {
        var button = document.createElement('button');
        button.setAttribute('class', "dropdown-btn");
        button.setAttribute('id', countryData[i].id);
        button.setAttribute('onclick', "toggleButtons(this.id)")
        button.innerHTML = (countryData[i].countryname);

        var icon = document.createElement('i')
        icon.setAttribute('class', "fa fa-caret-down");

        var div = document.createElement('div');
        div.setAttribute('id', "div" + countryData[i].id)
        div.setAttribute('class', "dropdown-container")

        button.appendChild(icon);
        countryContainer.appendChild(button);
        countryContainer.insertAdjacentElement("beforeend", div);
    }
}

// Appends the city links based on JSON data
function drawCities(cityData) {
    var dropdown = document.getElementsByClassName('dropdown-btn');

    for (let i = 0; i < dropdown.length; i++) {
        for (let j = 0; j < Object.values(cityData).length; j++) {
            var a = document.createElement('a');

            if (dropdown[i].getAttribute("id") == cityData[j].countryid) {
                var divCities = document.getElementById("div" + dropdown[i].id)

                a.innerHTML = cityData[j].stadname;
                a.setAttribute('href', "#");

                divCities.appendChild(a);
            } else {
                console.log("nothing in common");
            }
        }
    }
}