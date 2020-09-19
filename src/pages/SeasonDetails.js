import React, { Component } from "react";
import DataTable from "react-data-table-component";
import API from "../API";

import "popper.js";
import $ from "jquery";
import "bootstrap";
import { Modal } from "./Modal";
import DriverDetails from "./DriverDetails";
import TeamDetails from "./TeamDetails";

const driverColumns = [
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
  {
    name: "Wins",
    selector: "wins",
    sortable: true,
  },
];

const teamColumns = [
  {
    name: "Position",
    selector: "position",
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
  {
    name: "Wins",
    selector: "wins",
    sortable: true,
  },
];

const raceColumns = [
  {
    name: "Round",
    selector: "round",
    sortable: true,
  },
  {
    name: "Race",
    selector: "name",
    sortable: true,
  },
  {
    name: "Circuit",
    selector: "circuit",
    sortable: true,
  },
  {
    name: "Date",
    selector: "date",
    sortable: true,
  },
  {
    name: "Location",
    selector: "location",
    sortable: true,
  },
];

export default class SeasonDetails extends Component {
  state = {
    isLoading: true,
    season: {},
    drivers: [],
    teams: [],
    races: [],
    driver: {},
    team: {},
    circuit: {},
  };

  componentDidMount = () => {
    const { season } = this.props.match.params;
    if (!season) {
      this.props.history.push("/");
      return false;
    }

    const reqs = [
      API.get(`${season}.json`),
      API.get(`${season}/driverStandings.json`),
      API.get(`${season}/constructorStandings.json`),
    ];

    Promise.all(reqs).then((r) => {
      const races = r[0].data.MRData.RaceTable.Races.map((race) => {
        return {
          key: race.round,
          id: race.Circuit.circuitId,
          round: race.round,
          name: race.raceName,
          circuit: race.Circuit.circuitName,
          date: race.date,
          location: `${race.Circuit.Location.locality}, ${race.Circuit.Location.country}`,
        };
      });
      const drivers = r[1].data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
        (driver) => {
          return {
            id: driver.Driver.driverId,
            position: driver.position,
            driver: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
            team: driver.Constructors[0].name,
            points: driver.points,
            wins: driver.wins,
          };
        }
      );
      const teams = r[2].data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(
        (team) => {
          return {
            id: team.Constructor.constructorId,
            position: team.position,
            team: team.Constructor.name,
            points: team.points,
            wins: team.wins,
          };
        }
      );

      this.setState({ races, drivers, teams });
    });
  };

  handleShowDriverDetail = (driver) => {
    if (driver) {
      API.get(`drivers/${driver}.json`)
        .then((r) => {
          const { Drivers } = r.data.MRData.DriverTable;

          this.setState({ driver: Drivers[0] }, () => {
            $("#driverModal").modal("show");
          });
        })
        .catch((err) => console.log(err));
    }
  };

  handleShowTeamDetail = (team) => {
    if (team) {
      API.get(`constructors/${team}.json`)
        .then((r) => {
          const { Constructors } = r.data.MRData.ConstructorTable;

          this.setState({ team: Constructors[0] }, () => {
            $("#teamModal").modal("show");
          });
        })
        .catch((err) => console.log(err));
    }
  };

  handleShowCircuitDetail = (circuit) => {
    if (circuit) {
      API.get(`circuits/${circuit}.json`)
        .then((r) => {
          const { Circuits } = r.data.MRData.CircuitTable;

          this.setState({ circuit: Circuits[0] }, () => {
            console.log(this.state.circuit);
          });
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <DataTable
          title={`${this.props.match.params.season} Season Drivers Standing`}
          columns={driverColumns}
          data={this.state.drivers}
          highlightOnHover
          striped
          pointerOnHover
          onRowClicked={({ id }) => this.handleShowDriverDetail(id)}
          subHeader
          subHeaderComponent={
            <p className="small text-muted">
              Click on a driver for detailed information.
            </p>
          }
          subHeaderAlign="left"
          fixedHeader
          fixedHeaderScrollHeight="300px"
          progressPending={Boolean(!this.state.drivers.length)}
        />

        <DataTable
          title={`${this.props.match.params.season} Season Teams Standing`}
          columns={teamColumns}
          data={this.state.teams}
          highlightOnHover
          striped
          pointerOnHover
          onRowClicked={({ id }) => this.handleShowTeamDetail(id)}
          subHeader
          subHeaderComponent={
            <p className="small text-muted">
              Click on a team for detailed information.
            </p>
          }
          subHeaderAlign="left"
          fixedHeader
          fixedHeaderScrollHeight="300px"
          progressPending={Boolean(!this.state.teams.length)}
        />

        <DataTable
          title={`${this.props.match.params.season} Season Races`}
          columns={raceColumns}
          data={this.state.races}
          keyField="key"
          highlightOnHover
          striped
          pointerOnHover
          onRowClicked={({ round }) =>
            this.props.history.push(
              `/season/${this.props.match.params.season}/race/${round}`
            )
          }
          subHeader
          subHeaderComponent={
            <p className="small text-muted">
              Click on a race for detailed information.
            </p>
          }
          subHeaderAlign="left"
          fixedHeader
          fixedHeaderScrollHeight="300px"
          progressPending={Boolean(!this.state.races.length)}
        />

        <Modal
          title={`${this.state.driver.givenName} ${this.state.driver.familyName} (${this.state.driver.code})`}
          id="driverModal"
        >
          <DriverDetails {...this.state.driver} />
        </Modal>

        <Modal title={`${this.state.team.name}`} id="teamModal">
          <TeamDetails {...this.state.team} />
        </Modal>
      </div>
    );
  }
}
