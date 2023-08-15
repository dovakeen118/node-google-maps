import React from "react";

const LocationResultList = (props) => {
  const results = props.locationResults.map((result) => {
    const handleClick = () => {
      props.setLocationSearchInput("");
      props.setLocationResults([]);
      props.setShouldRequestLocation(false);
      props.setLocation({
        lat: result.geometry.location.lat(),
        lng: result.geometry.location.lng(),
      });
    };

    return (
      <li key={result.formatted_address}>
        {result.formatted_address}
        <button className="button" onClick={handleClick}>
          Set as location
        </button>
      </li>
    );
  });

  return (
    <>
      {results.length > 0 ? (
        <>
          <p>Does this match the location you were looking for?</p>
          <p>If not, please be more specific with your search.</p>
        </>
      ) : null}
      <ul>{results}</ul>
    </>
  );
};

export default LocationResultList;
