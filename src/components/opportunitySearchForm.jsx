import React from "react";
import PropTypes from "prop-types";
import Form from "./common/form";
import { getCurrentUser } from "../services/authService";
import _ from "lodash";
import joi from "joi-browser";

class OpportunitySearchForm extends Form {
  state = {
    data: _.cloneDeep(this.props.data),
    errors: {},
    user: getCurrentUser()
  };

  locationSchema = {
    area: joi.string().label("Area"),
    city: joi.string().label("City")
  };

  scheduleSchema = {
    fromDate: joi
      .date()
      .iso()
      .label("From"),
    toDate: joi
      .date()
      .iso()
      .label("To"),
    maxDurationDays: joi
      .number()
      .integer()
      .min(1)
      .label("Max Duration (days)"),
    maxHoursPerDay: joi
      .number()
      .integer()
      .min(1)
      .max(8)
      .label("Max Hours/day")
  };

  schema = {
    keywords: joi.string().label("Keywords"),
    location: this.locationSchema,
    schedule: this.scheduleSchema,
    email: joi
      .string()
      .email()
      .label("Email")
  };

  renderLocation() {
    const locationPropParentPath = ["location"];
    return (
      <React.Fragment>
        {this.renderInput(locationPropParentPath, "area", "Area")}
        {this.renderInput(locationPropParentPath, "city", "City")}
      </React.Fragment>
    );
  }

  renderSchedule() {
    const schedulePropParentPath = ["schedule"];
    return (
      <div className="row mt-1">
        {this.renderInput(schedulePropParentPath, "fromDate", "From", {
          type: "date"
        })}
        {this.renderInput(schedulePropParentPath, "toDate", "To", {
          type: "date"
        })}
        {this.renderInput(
          schedulePropParentPath,
          "maxDurationDays",
          "Max Duration (in days)"
        )}
        {this.renderInput(
          schedulePropParentPath,
          "maxHoursPerDay",
          "Max Hours/day"
        )}
      </div>
    );
  }

  doSubmit = () => {
    this.props.onSearch(_.cloneDeep(this.state.data));
  };

  doReset = () => {
    this.setState({ data: { location: {}, schedule: {} } });
  };

  render() {
    const { user } = this.state;
    const { isLoading } = this.props;
    const isStaff = user && user.isStaff;
    return (
      <div className="table justify-content-md-left">
        <form onSubmit={this.handleSubmit} onReset={this.doReset}>
          <div className="row">
            <h5 className="mr-2">Opportunity Search: </h5>
            {this.renderSubmit("search", "Search", { isLoading })}
            {this.renderReset("reset", "Reset", { disabled: isLoading })}
          </div>
          <div className="row mt-1">
            {this.renderInput(null, "keywords", "Keywords")}
            {isStaff && this.renderInput(null, "email", "Email")}
            {this.renderLocation()}
          </div>
          {this.renderSchedule()}
        </form>
      </div>
    );
  }
}

OpportunitySearchForm.propTypes = {
  data: PropTypes.shape({
    keywords: PropTypes.string,
    location: {
      area: PropTypes.string,
      city: PropTypes.string
    },
    schedule: {
      fromDate: PropTypes.string,
      toDate: PropTypes.string,
      maxDurationDays: PropTypes.number,
      maxHoursPerDay: PropTypes.number
    },
    email: PropTypes.string
  }),
  onSearch: PropTypes.func,
  isLoading: PropTypes.bool
};

export default OpportunitySearchForm;
