let map, service, userLocation;

function getLocation(){
  navigator.geolocation.getCurrentPosition(pos=>{
    userLocation={
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    };

    map=new google.maps.Map(document.getElementById("map"),{
      center:userLocation,
      zoom:14
    });

    new google.maps.Marker({
      position:userLocation,
      map,
      title:"You are here"
    });

    service=new google.maps.places.PlacesService(map);

    fetchCityImage(userLocation);
  });
}

function searchPlace(type){
  service.nearbySearch({
    location:userLocation,
    radius:3000,
    type:[type]
  },(results,status)=>{
    if(status===google.maps.places.PlacesServiceStatus.OK){
      results.forEach(p=>{
        new google.maps.Marker({
          position:p.geometry.location,
          map,
          title:p.name
        });
      });
    }
  });
}

function fetchCityImage(loc){
  document.getElementById("banner").style.backgroundImage=
    `url(https://source.unsplash.com/800x400/?city,village)`;
}
