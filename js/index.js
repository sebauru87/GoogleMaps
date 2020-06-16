var map;

function initMap() {
    let montevideoCoordinates = {
        lat: -34.9032784,
        lng: -56.1881599
    }
    map = new google.maps.Map(document.getElementById("map"), {
        center: montevideoCoordinates,
        zoom: 14
    });
    createMarker();

}
const createMarker = () => {
    var marker = new google.maps.Marker({
        position: {
            lat: -34.907291,
            lng: -56.184676
        },
        map: map,
        title: 'Hello World!'
    });
}