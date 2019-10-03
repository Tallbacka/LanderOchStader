//Inlämning Städer och länder Webbutveckling .Net
const cities = "json/stad.json";
const countries = "json/land.json";

getById('body').onload = function () {
    getCountryData();
    getCityData();
    cityLookUp("div1", "Stockholm")
}


// Countries json data retrival
async function getCountryData() {
    let responseCountry = await fetch(countries);
    let countryData = await responseCountry.json()
    return countryData;
} getCountryData()
    .then(countryData => drawCountry(countryData))
    .then(countryData => { return countryData })
    .catch(err => console.log("A problem occured with your fetch operation", err.message));

// Cities json data retrival
async function getCityData() {
    let responseCity = await fetch(cities);
    let cityData = await responseCity.json()
    return cityData;
} getCityData()
    .then(cityData => sortByPopulation(cityData))
    .then(cityData => drawCities(cityData))
    .then(cityData => { return cityData })
    .catch(err => console.log(err));

// Appends the country buttons based on JSON data
function drawCountry(countryData) {
    var countryContainer = getById('countryBar');

    for (let i = 0; i < Object.values(countryData).length; i++) {
        let a = createNode('button'),
            divCountry = createNode('div'),
            divCity = createNode('div');

        a.setAttribute('class', "w3-button w3-block");
        a.setAttribute('onclick', "showCities(" + `'div${countryData[i].id}'` + ")")
        a.setAttribute('id', "countryButton")
        a.innerHTML = countryData[i].countryname;

        divCountry.setAttribute('class', "w3-bar w3-button w3-text-white w3-middle w3-large w3-border-bottom countryContainer");
        divCountry.setAttribute('id', countryData[i].id);

        divCity.setAttribute('id', "div" + countryData[i].id);
        divCity.setAttribute('class', "w3-hide w3-bar-item w3-text-white w3-middle w3-medium w3-border-bottom cityContainer");

        append(divCountry, a)
        append(countryContainer, divCountry)
        countryContainer.insertAdjacentElement("beforeend", divCity)
    }
}

// Appends the city links based on JSON data
function drawCities(cityData) {
    var cityContainer = document.getElementsByClassName("cityContainer")

    for (let i = 0; i < cityContainer.length; i++) {
        for (let j = 0; j < cityData.length; j++) {
            var a = createNode('a');
            if (cityContainer[i].getAttribute("id") === "div" + cityData[j].countryid) {
                a.setAttribute('class', "w3-button w3-large");
                a.setAttribute('id', "city" + cityData[j].id);
                a.setAttribute('onclick', "cityLookUp(this.id, this.innerHTML)")
                a.innerHTML = cityData[j].stadname;

                append(cityContainer[i], a)
            }
        }
    }
}

function cityLookUp(buttonId, cityName) {
    fetch(cities)
        .then((resp) => resp.json())
        .then(function (citydata) {

            let ul = getById('cityData'),
                cityHeader = getById('cityName'),
                btnId = buttonId.replace(/^\D+/g, '');

            for (let i = 0; i < citydata.length; i++) {
                if (parseInt(btnId) === parseInt(citydata[i].id)) {
                    cityHeader.innerHTML = citydata[i].stadname;
                    var li = createNode('li');
                    li.innerHTML = "Population: " + citydata[i].population;
                    removeElements(ul);
                    append(ul, li);
                }
            }

        })
    getCityLocation(cityName);
}

// Sends a request for city location on google maps, and returns a json object.
async function getCityLocation(name) {
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + name + "&key=AIzaSyDXoktJ4NGVFwy52MuWTQMyNoNJzmIU3ck"

    fetch(url)
        .then((resp) => resp.json())
        // .then(cityMap => console.log(cityMap))
        .then(cityMap => initMap(cityMap))
        .catch(err => console.log("A problem occured with your fetch operation\n", err.message))

}
// Calling the google API for inserting a map with a location marker without using an iframe
function initMap(cityData) {
    var btnVisited = createNode('button');
    btnVisited.setAttribute('id', "btnVisited");
    btnVisited.setAttribute('onclick', "visited()");
    btnVisited.innerHTML = "Har besökt";


    let lat = cityData.results[0].geometry.location.lat, //Expects that the first object in the array is correct "fingers crossed"
        lng = cityData.results[0].geometry.location.lng; //Expects that the first object in the array is correct "fingers crossed"
    console.log(lat + "-" + lng);

    var city = { lat: lat, lng: lng };
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 8, center: city });
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(btnVisited)
    // The marker, positioned at Tallbacka
    var marker = new google.maps.Marker({ position: city, map: map, title: 'Här bor jag!!' });
}


function createUser() {
    removeElements(loginData);
    var header = createNode('h3');
    header.innerHTML = "Skapa användare";

    var button = getById('btnLogin');
    button.innerHTML = "Skapa";
}

// Sorts the city data after population desc.
function sortByPopulation(cityData) {
    cityData.sort(function (a, b) { return b.population - a.population });
    return cityData;
}

//Animation related functions
function w3_open() {
    document.getElementById("countryBar").style.display = "block";
}
function w3_close() {
    document.getElementById("countryBar").style.display = "none";
}

var eventModal = document.getElementById('loginModal')
window.onclick = function (eventModal) {
    if (eventModal.target == eventModal) {
        eventModal.style.display = "none";
    }
}

function showCities(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}


//Helper functions
function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function getById(ele) {
    return document.getElementById(ele)
}

function removeElements(parent) {
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.lastChild);
    }
}