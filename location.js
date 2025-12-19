let map;
let selected = "hospital";

function setType(type) {
  selected = type;
  getLocation();
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showMap);
}

function showMap(pos) {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  map = L.map("map").setView([lat, lon], 14);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
    .addTo(map);

  fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("locationName").innerText =
        data.address.city || data.address.village || "Your Area";

      document.getElementById("banner").style.backgroundImage =
        `url(https://source.unsplash.com/800x400/?${data.address.city || "village"})`;
    });

  let filter =
    selected === "hospital" ? `node["amenity"="hospital"]` :
    selected === "pharmacy" ? `node["amenity"="pharmacy"]` :
    selected === "grocery" ? `node["shop"="supermarket"]` :
    `node["tourism"="hotel"]`;

  fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: `[out:json];${filter}(around:2500,${lat},${lon});out;`
  })
  .then(res => res.json())
  .then(data => {
    data.elements.forEach(p => {
      L.marker([p.lat, p.lon]).addTo(map)
        .bindPopup(p.tags.name || "Nearby Place");
    });
  });
}
