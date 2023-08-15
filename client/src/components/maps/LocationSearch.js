import React from "react";

const LocationSearch = ({
  getLocation,
  locationSearchInput,
  setLocationSearchInput,
  shouldRequestLocation,
  setShouldRequestLocation,
}) => {
  const handleChange = (event) => {
    setLocationSearchInput(event.currentTarget.value);
  };

  const handleSearch = () => {
    getLocation({ query: locationSearchInput, fields: ["geometry", "formatted_address", "name"] });
  };

  const handleClick = () => {
    setShouldRequestLocation(true);
  };

  return (
    <>
      {shouldRequestLocation ? (
        <div className="callout">
          <h4>Where are you?</h4>

          <div className="grid-x">
            <label htmlFor="search" className="cell small-10">
              <input id="search" type="text" onChange={handleChange} value={locationSearchInput} />
            </label>

            <button className="button cell small auto" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      ) : (
        <button className="button" onClick={handleClick}>
          Enter a location
        </button>
      )}
    </>
  );
};

export default LocationSearch;
