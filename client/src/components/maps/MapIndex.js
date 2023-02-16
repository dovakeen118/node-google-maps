import React from "react"
import { Link } from "react-router-dom"

export const MapIndex = (props) => {
  return (
    <ul>
      <li><Link to="/vanilla-google-map">Vanilla Google Map</Link> (enable script in client/public/index.html)</li>
    </ul>
  )
}

export default MapIndex