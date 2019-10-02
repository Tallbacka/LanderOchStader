//Inlämning Städer och länder Webbutveckling .Net

const cities = "json/stad.json";
const countries = "json/land.json";

getById('body').onload = function () {
    getCountryData();
    getCityData();
    cityLookUp("city1")
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
    .then(cityData => {return cityData})
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
            if (cityContainer[i].getAttribute("id") === "div"+cityData[j].countryid) {
                a.setAttribute('class', "w3-button w3-large");
                a.setAttribute('id', "city" + cityData[j].id );
                a.setAttribute('onclick', "cityLookUp(this.id)")
                a.innerHTML = cityData[j].stadname;
                
                append(cityContainer[i], a)
            }
        }
    }
}

function cityLookUp(buttonId){
    fetch(cities)
    .then((resp) => resp.json())
    .then(function(citydata){ 

        let ul = getById('cityData'),
            cityHeader = getById('cityName'),
            btnId = buttonId.replace(/^\D+/g, '');

        for (let i = 0; i < citydata.length; i++) {
            // console.log(btnId, citydata[i].id);
            if (parseInt(btnId) === parseInt(citydata[i].id)) {
                console.log("natt stammer");
                cityHeader.innerHTML = citydata[i].stadname;
                var li = createNode('li');
                li.innerHTML= "Population: " + citydata[i].population;
                removeElements(ul);
                append(ul, li);
            }
            else{"inget stammer"};
        }
        
    })
}

// Sorts the city data after population desc.
function sortByPopulation(cityData) {
    cityData.sort(function (a, b) { return b.population - a.population });
    return cityData;
}

function visited() {

  }


 function createUser(){
     removeElements(loginData);
     var header = createNode('h3');
     header.innerHTML = "Skapa användare";

     var button = getById('btnLogin');
     button.innerHTML = "Skapa";
 }

// Calling the google API for inserting a map with a location marker without using an iframe
// function initMap(city) {
//     // The location of Tallbacka
//     var tallBacka = { lat: 57.929239, lng: 13.964798 };
//     // The map, centered at Tallbacka
//     var map = new google.maps.Map(
//         document.getElementById('map'), { zoom: 8, center: tallBacka });
//     // The marker, positioned at Tallbacka
//     var marker = new google.maps.Marker({ position: tallBacka, map: map, title: 'Här bor jag!!' });
// }

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

function getById (ele) {  
    return document.getElementById(ele)
}

function removeElements(parent) { 
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.lastChild);
    }
 }