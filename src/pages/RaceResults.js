import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { Link, withRouter } from "react-router-dom";
import API from "../API";

const columns = [
  {
    name: "Position",
    selector: "position",
    sortable: true,
  },
  {
    name: "Driver",
    selector: "driver",
    sortable: true,
  },
  {
    name: "Team",
    selector: "team",
    sortable: true,
  },
  {
    name: "Points",
    selector: "points",
    sortable: true,
  },
];

class RaceResults extends Component {
  state = {
    drivers: [],
    race: {},
    isLoading: true,
  };

  componentDidMount = () => {
    API.get(
      `${this.props.match.params.season}/${this.props.match.params.race}/results.json`
    ).then((r) => {
      const { Races } = r.data.MRData.RaceTable;

      if (Races.length) {
        let race = { ...Races[0] };
        delete race.Results;

        const drivers = Races[0].Results.map((driver) => {
          return {
            id: driver.Driver.driverId,
            position: driver.position,
            driver: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
            team: driver.Constructor.name,
            points: driver.points,
          };
        });

        this.setState({ drivers, race }, () =>
          this.setState({ isLoading: false })
        );
      } else {
        alert("Race not found or not yet finished.");
        this.props.history.goBack();
      }
    });
  };
  render() {
    return (
      <>
        <Link
          to="#!"
          onClick={(e) => {
            e.preventDefault();
            this.props.history.goBack();
          }}
        >
          {"<"} Go back
        </Link>
        <div className="mt-3">
          {this.state.isLoading ? (
            `Loading...`
          ) : (
            <DataTable
              title={`${this.props.match.params.season} Season ${this.state.race.raceName} Standing`}
              columns={columns}
              data={this.state.drivers}
              highlightOnHover
              striped
              fixedHeader
              progressPending={Boolean(!this.state.drivers.length)}
            />
          )}
        </div>
      </>
    );
  }
}

export default withRouter(RaceResults);
