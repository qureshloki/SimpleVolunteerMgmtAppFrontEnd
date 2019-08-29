import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      label: PropTypes.string,
      content: PropTypes.func
    })
  ),
  sortColumn: PropTypes.shape({
    path: PropTypes.string,
    order: PropTypes.string
  }),
  onSort: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string
    })
  )
};

export default Table;
