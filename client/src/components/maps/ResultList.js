import React from "react"

import ResultTile from "./ResultTile"

const ResultList = (props) => {
  const results = props.searchResults.map((result) => {
    // debugger
    return (
      <ResultTile
        key={result.place_id}
        result={result}
      />
    )
  })

  return (
    <>
      {results}
    </>
  )
}

export default ResultList