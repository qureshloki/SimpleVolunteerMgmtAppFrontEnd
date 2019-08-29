import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Table from "./common/table";

class OpportunitiesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: opportunity => (
        <Link to={`/opportunities/${opportunity._id}`}>
          {opportunity.title}
        </Link>
      )
    },
    { path: "description", label: "Desc" },
    { path: "location.city", label: "City" },
    { path: "location.area", label: "Area" },
    { path: "schedule.fromDate", label: "From" },
    { path: "schedule.toDate", label: "To" },
    { path: "schedule.hoursPerDay", label: "Hours/Day" },
    { path: "email", label: "email" }
  ];

  render() {
    const { opportunities, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={opportunities}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

OpportunitiesTable.propTypes = {
  sortColumn: PropTypes.shape({
    path: PropTypes.string,
    order: PropTypes.string
  }),
  onSort: PropTypes.func,
  opportunities: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      location: {
        city: PropTypes.string,
        area: PropTypes.string
      },
      schedule: {
        fromDate: PropTypes.string,
        toDate: PropTypes.string
      }
    })
  )
};

export default OpportunitiesTable;
