import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item._id + column.path;
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      label: PropTypes.string,
      content: PropTypes.func
    })
  ),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string
    })
  )
};

export default TableBody;
