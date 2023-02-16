import React, { useEffect } from "react"

const VanillaGoogleMap = (props) => {
  // take note of script in client/public/index.html that designates the API key

  const boston = { lat: 42.361, lng: -71.057 };

  const initMap = () => {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: boston,
      zoom: 11,
    });

    new google.maps.Marker({
      position: new google.maps.LatLng(boston),
      map: map,
    });
  }

  useEffect(() => {
    initMap()
  })

  return (
    <>
      <h1>Vanilla Google Maps</h1>
      <ul>
        <li>Requires the script in client/public/index.html which designates the API key</li>
        <li>Displaying a marker for the coordinates of Boston</li>
      </ul>
      <div id="map" style={{height:400}}></div>
    </>
  )
}

export default VanillaGoogleMap