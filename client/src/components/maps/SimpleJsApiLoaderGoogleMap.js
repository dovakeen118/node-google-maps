import React from "react"
import { Loader } from "@googlemaps/js-api-loader"

const SimpleJsApiLoaderGoogleMap = (props) => {
  // may need to comment out script in client/public/index.html
  
  const loader = new Loader({
    apiKey: "AIzaSyBraMYwUbKzwtWbXX2s4r4ENgPHJ32f28o",
    libraries: ["places"]
  });

  loader.load().then(() => {
    const boston = { lat: 42.361, lng: -71.057 };
    
    const map = new google.maps.Map(document.getElementById("map"), {
      center: boston,
      zoom: 12,
    });
    
    // 1. Single marker
    new google.maps.Marker({
      position: boston,
      map: map,
    });


    // 2. Multiple markers based on request query

    // const request = {
    //   query: "tatte",
    //   location: boston,
    //   radius: "500"
    // };

    // const service = new google.maps.places.PlacesService(map);
    // service.textSearch(request, function(results, status) {
    //   if (status === google.maps.places.PlacesServiceStatus.OK) {
    //     results.forEach((result) => {
    //       new google.maps.Marker({
    //         position: new google.maps.LatLng(result.geometry.location.lat(), result.geometry.location.lng()),
    //         map: map,
    //       });
    //     })

    //     map.setCenter(results[0].geometry.location);
    //   }
    // })
  })

  return (
    <>
      <h1>Simple JS API Loader Google Maps</h1>
      <ul>
        <li>Should comment out script in client/public/index.html which declares Google Maps loader for other maps</li>
        <li>Displaying a single marker for Boston</li>
        <li>Component has logic for displaying multiple markers base on a request query</li>
      </ul>
      <div id="map" style={{height:400}}></div>
    </>
  )
}

export default SimpleJsApiLoaderGoogleMap