var map;
var infoWindow;

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
    getStores();


}
const createMarker = (storeLat, storeLng, name, index) => {
    let html = `<i class="fas fa-location-arrow"></i><b>${name}</b> <br/>`;
    var marker = new google.maps.Marker({
        position: {
            lat: storeLat,
            lng: storeLng
        },
        map: map,
        title: name,
        label: `${index}`
    });
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
}

const getStores = () => {
    const API_URL = 'http://localhost:3000/api/stores';
    fetch(API_URL)
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            } else {
                throw new Error(response.status);
            }

        }).then((data) => {
            //console.log(data);
            searchLocationsNear(data);
            setStoresList(data);

        });
}

const searchLocationsNear = (stores) => {
    stores.forEach((store, index) => {
        //console.log(store.name);
        let storeLat = store.latitude;
        let storeLng = store.longitude;
        let storeName = store.name;
        let titleName = changeName(storeName);

        createMarker(storeLat, storeLng, titleName, index + 1);

    })
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
        htmlDiv +=`<div class="background">
                    <div class="store">
                    <div class="store-title">${store.name}</div>
                    <div class="store-index">${index+1}</div>
                    </div>
                    </div>`;
    })

    document.querySelector('.store-info-container').innerHTML = htmlDiv;
}