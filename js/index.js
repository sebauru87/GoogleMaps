var map;
var infoWindow;
var markers = [];



function initMap() {
    let montevideoCoordinates = {
        lat: -34.9032784,
        lng: -56.1881599
    }
    map = new google.maps.Map(document.getElementById("map"), {
        center: montevideoCoordinates,
        zoom: 14
    });
    //createMarker();
    infoWindow = new google.maps.InfoWindow();

}

const createMarker = (latlng, name, index) => {
    let html = `<i class="fas fa-location-arrow"></i><b>${name}</b> <br/>`;
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title: name,
        label: `${index}`
    });
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);
}

const getStores = () => {
    const zipCode = document.getElementById('zipCode').value;
    if (!zipCode) {
        return;
    }
    const API_URL = `http://localhost:3000/api/stores?zip_code=${zipCode}`;
    fetch(API_URL)
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            } else {
                throw new Error(response.status);
            }

        }).then((data) => {
            //console.log(data);
            clearLocations();
            searchLocationsNear(data);
            setStoresList(data);
            setOnClickListener();
        });
}

const searchLocationsNear = (stores) => {

    stores.forEach((store, index) => {
        //console.log(store.name);
        let latlng = new google.maps.LatLng(
            store.location["coordinates"][1],
            store.location["coordinates"][0]);
        let storeLng = store.longitude;
        let storeName = store.name;
        let titleName = changeName(storeName);

        createMarker(latlng, titleName, index + 1);

    })
}
const clearLocations = () => {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;
}

const changeName = (title) => {
    let titleName = '';
    for (let i of title) {
        //console.log(i);
        if (i == '<') {
            break;
        }
        titleName += i;
    }
    return titleName;
}
const setStoresList = (stores) => {
    let htmlDiv = '';
    stores.forEach((store, index) => {
        htmlDiv += `<div class="background">
                    <div class="store">
                    <div class="store-title">${store.name}</div>
                    <div class="store-index">${index+1}</div>
                    </div>
                    </div>`;
    })

    document.querySelector('.store-info-container').innerHTML = htmlDiv;
}

const setOnClickListener = () => {
    let storeElements = document.querySelectorAll('.store');

    storeElements.forEach((elem, index) => {
        elem.addEventListener('click', () => {
            google.maps.event.trigger(markers[index], 'click');
        })

    })
}
// document.getElementById("search").addEventListener("click", getStores());