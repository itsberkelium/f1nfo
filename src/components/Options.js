import React from "react";

const Options = (props) => {
  return (
    <div
      className={`Options position-relative ${
        props.isFetchingData ? `fetching` : ``
      }`}
    >
      <div className="row">
        <div className="col-3">
          <div className="form-group m-0">
            <select
              name="season"
              id="season"
              className="custom-select"
              onChange={props.handleSelectOption}
              value={props.selectedSeason}
            >
              <option hidden>-- Select a season --</option>
              {props.seasons.map((data) => (
                <option key={data.season} value={data.season}>
                  {data.season}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
