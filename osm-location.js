let map;
let selectedType = "pharmacy";

function selectType(type) {
  selectedType = type;
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showMap, () => {
    alert("Location permission needed");
  });
}

function showMap(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  map = L.map("map").setView([lat, lon], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
    .addTo(map);

  L.marker([lat, lon]).addTo(map)
    .bindPopup("📍 You are here")
    .openPopup();

  findPlaces(lat, lon);
}

function findPlaces(lat, lon) {
  let filter = selectedType === "pharmacy"
    ? `node["amenity"="pharmacy"]`
    : selectedType === "grocery"
    ? `node["shop"="supermarket"]`
    : `node["tourism"="hotel"]`;

  const query = `
    [out:json];
    ${filter}(around:2500,${lat},${lon});
    out;
  `;

  fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query
  })
  .then(res => res.json())
  .then(data => {
    data.elements.forEach(place => {
      L.marker([place.lat, place.lon])
        .addTo(map)
        .bindPopup(place.tags.name || "Nearby Place");
    });
  });
}
