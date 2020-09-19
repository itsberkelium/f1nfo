import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { withRouter } from "react-router";
import API from "../API";

const columns = [
  {
    name: "Season",
    selector: "season",
    sortable: true,
  },
  {
    name: "More Info",
    selector: "url",
    sortable: true,
    right: true,
    cell: (row) => (
      <a
        href={row.url}
        style={{ textDecoration: "underline" }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {row.url}
      </a>
    ),
  },
];

class Home extends Component {
  state = {
    Seasons: [],
  };

  componentDidMount = () => {
    API.get("seasons.json?limit=100").then((r) => {
      const { Seasons } = r.data.MRData.SeasonTable;

      this.setState({ Seasons });
    });
  };

  render() {
    return (
      <div className="Home">
        <DataTable
          title="Seasons"
          columns={columns}
          data={this.state.Seasons}
          highlightOnHover
          striped
          pointerOnHover
          onRowClicked={({ season }) =>
            this.props.history.push(`/season/${season}`)
          }
          subHeader
          subHeaderComponent={
            <p className="small text-muted">
              Click on a row for detailed information.
            </p>
          }
          subHeaderAlign="left"
          defaultSortField="season"
          defaultSortAsc={false}
          progressPending={Boolean(!this.state.Seasons.length)}
        />
      </div>
    );
  }
}

export default withRouter(Home);
