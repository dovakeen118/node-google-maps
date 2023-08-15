import React, { useState } from "react";

const MapSearch = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (event) => {
    setSearchInput(event.currentTarget.value);
  };

  const handleSearch = () => {
    props.setSearchQuery(searchInput);
  };

  return (
    <div className="callout">
      <h4>What do you want to search for?</h4>

      <div className="grid-x">
        <label htmlFor="search" className="cell small-10">
          <input id="search" type="text" onChange={handleChange} />
        </label>

        <button className="button cell auto" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default MapSearch;
