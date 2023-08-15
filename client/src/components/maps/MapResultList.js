import React from "react";

import MapResultTile from "./MapResultTile";

const MapResultList = (props) => {
  const results = props.mapSearchResults.map((result) => {
    return <MapResultTile key={result.place_id} result={result} />;
  });

  return <>{results.length > 0 ? <div className="callout secondary">{results}</div> : null}</>;
};

export default MapResultList;
