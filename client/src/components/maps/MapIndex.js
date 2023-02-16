import React from "react"
import { Link } from "react-router-dom"

export const MapIndex = (props) => {
  return (
    <ul>
      <li><Link to="/vanilla-google-map">Vanilla Google Map</Link> (enable script in client/public/index.html)</li>
      <li><Link to="/simple-js-loader-map">Simple JS API Loader Google Map</Link></li>
      <li><Link to="/advanced-js-loader-map">Advanced JS API Loader Google Maps</Link></li>
      <li><Link to="/react-google-map">React Google Maps</Link></li>
    </ul>
  )
}

export default MapIndex