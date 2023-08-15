import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import LocationSearch from "./LocationSearch";
import MapSearch from "./MapSearch";
import MapResultList from "./MapResultList";
import LocationResultList from "./LocationResultList";

const AdvancedJsApiLoaderGoogleMap = (props) => {
  // may need to comment out script in client/public/index.html

  const [location, setLocation] = useState({
    lat: "",
    lng: "",
  });
  const [locationSearchInput, setLocationSearchInput] = useState("");
  const [locationResults, setLocationResults] = useState([]);
  const [locationError, setLocationError] = useState("");
  const [shouldRequestLocation, setShouldRequestLocation] = useState(false);
  const [mapSearchQuery, setMapSearchQuery] = useState("");
  const [mapSearchResults, setMapSearchResults] = useState([]);
  const [mapResultsError, setMapResultsError] = useState("");

  const loader = new Loader({
    apiKey: "AIzaSyBraMYwUbKzwtWbXX2s4r4ENgPHJ32f28o",
    libraries: ["places"],
  });

  const showPosition = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    setLocation({ lat, lng });
  };

  const posError = () => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((res) => {
        if (res.state === "denied") {
          setShouldRequestLocation(true);
          setLocationError(
            "Enable location permissions for this website in your browser settings."
          );
        }
      });
    } else {
      setLocationError(
        "Unable to access your location. You can continue by submitting your location manually."
      );
    }
  };

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, posError);
    } else {
      setLocationError(
        "Sorry, Geolocation is not supported by this browser. Please enable and try again."
      );
    }
  };

  const getLocation = (request) => {
    loader.load().then(() => {
      const service = new google.maps.places.PlacesService(map);
      service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setLocationResults(results);
        } else {
          setLocationError("No results found. Please try again.");
        }
      });
    });
  };

  useEffect(() => {
    getPosition();
  }, []);

  useEffect(() => {
    setMapResultsError("");
    setLocationError("");
    if (location.lat != "" && location.lng != "") {
      loader.load().then(() => {
        // const boston = { lat: 42.361, lng: -71.057 };
        const request = {
          query: mapSearchQuery,
          location: location,
          radius: "500",
        };

        const map = new google.maps.Map(document.getElementById("map"), {
          center: location,
          zoom: 11,
        });

        const service = new google.maps.places.PlacesService(map);
        if (mapSearchQuery) {
          service.textSearch(request, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              setMapSearchResults(results);
              results.forEach((result) => {
                const resultContent =
                  `<p>${result.name}</p>` + `<p>${result.formatted_address}</p>`;

                const infowindow = new google.maps.InfoWindow({
                  content: resultContent,
                  ariaLabel: result.name,
                });

                const marker = new google.maps.Marker({
                  position: new google.maps.LatLng(
                    result.geometry.location.lat(),
                    result.geometry.location.lng()
                  ),
                  map: map,
                });

                marker.addListener("click", () => {
                  infowindow.open({
                    anchor: marker,
                    map,
                  });
                });
              });

              map.setCenter(results[0].geometry.location);
            } else {
              setMapResultsError("No results found, please try again.");
              setMapSearchResults([]);
            }
          });
        } else {
          new google.maps.Marker({
            position: location,
            map: map,
          });
        }
      });
    }
  }, [location, mapSearchQuery]);

  return (
    <>
      <h1>Advanced JS API Loader Google Maps</h1>
      <ul>
        <li>
          Should comment out script in application.html.erb which declares Google Maps loader for
          other maps
        </li>
        <li>
          Displaying a map around Boston, ready to search based on user request in the search bar
        </li>
        <li>
          Will display list of found results, multiple map markers, and map markers are clickable
          for more info
        </li>
      </ul>

      <div className="grid-x grid-margin-x">
        <div className="cell medium-6">
          {locationError ? <p className="callout alert">{locationError}</p> : null}
          <LocationSearch
            getLocation={getLocation}
            locationSearchInput={locationSearchInput}
            setLocationSearchInput={setLocationSearchInput}
            shouldRequestLocation={shouldRequestLocation}
            setShouldRequestLocation={setShouldRequestLocation}
          />

          {locationSearchInput ? (
            <LocationResultList
              locationResults={locationResults}
              setLocationResults={setLocationResults}
              setLocation={setLocation}
              setLocationSearchInput={setLocationSearchInput}
              setShouldRequestLocation={setShouldRequestLocation}
            />
          ) : null}

          {location.lat != "" && location.lng != "" ? (
            <MapSearch setSearchQuery={setMapSearchQuery} />
          ) : null}
          {mapResultsError ? <p className="callout alert">{mapResultsError}</p> : null}

          <MapResultList mapSearchResults={mapSearchResults} />
        </div>

        <div id="map" style={{ height: 400 }} className="cell medium-6">
          {location.lat === "" && location.lng === ""
            ? "Finding your location..."
            : "Loading the map..."}
        </div>
      </div>
    </>
  );
};

export default AdvancedJsApiLoaderGoogleMap;
