import React from "react";
import PropTypes from "prop-types";
import Form from "./common/form";
import Button from "./common/button";
import {
  getOpportunity,
  deleteOpportunity,
  saveOpportunity
} from "../services/opportunityService";
import authService from "../services/authService";
import { getDaysOfTheWeekPicklist, getDaysOfTheWeekIds } from "../utils/util";
import { toast } from "react-toastify";
import joi from "joi-browser";
import _ from "lodash";

class OpportunityForm extends Form {
  state = {
    data: {
      _id: this.props.isNew ? undefined : this.props.match.params.id
    },
    errors: {},
    isEdit: this.props.isNew,
    isNew: this.props.isNew,
    user: authService.getCurrentUser()
  };

  locationSchema = {
    street: joi
      .string()
      .required()
      .label("Street"),
    area: joi
      .string()
      .required()
      .label("Area"),
    city: joi
      .string()
      .required()
      .label("City"),
    zip: joi
      .number()
      .required()
      .min(100000)
      .max(999999)
      .label("Zip")
  };

  scheduleSchema = {
    fromDate: joi
      .date()
      .min("now")
      .iso()
      .required()
      .label("From"),
    toDate: joi
      .date()
      .min("now")
      .iso()
      .label("To"),
    minDurationDays: joi
      .number()
      .integer()
      .min(1)
      .label("Min Duration (in days)"),
    days: joi
      .array()
      .min(1)
      .unique()
      .required()
      .items(joi.string().valid(getDaysOfTheWeekIds()))
      .label("Days"),
    hoursPerDay: joi
      .number()
      .integer()
      .min(1)
      .max(8)
      .required()
      .label("Hours/day")
  };

  schema = {
    _id: joi.string(),
    title: joi
      .string()
      .required()
      .label("Title"),
    description: joi
      .string()
      .required()
      .label("Description"),
    location: this.locationSchema,
    schedule: this.scheduleSchema,
    email: joi
      .string()
      .email()
      .required()
      .label("Email")
  };

  mapToViewModel(opportunity) {
    const view = {
      _id: opportunity._id,
      title: opportunity.title,
      description: opportunity.description,
      location: opportunity.location,
      schedule: opportunity.schedule,
      email: opportunity.email
    };
    delete view.location._id;
    delete view.schedule._id;
    return view;
  }

  async componentDidMount() {
    await this.populateOpportunity();
  }

  renderLocation() {
    const locationPropParentPath = ["location"];
    const { isEdit } = this.state;
    return (
      <div>
        <h4>Location</h4>
        {this.renderInput(locationPropParentPath, "street", "Street", {
          readOnly: !isEdit
        })}
        {this.renderInput(locationPropParentPath, "area", "Area", {
          readOnly: !isEdit
        })}
        {this.renderInput(locationPropParentPath, "city", "City", {
          readOnly: !isEdit
        })}
        {this.renderInput(locationPropParentPath, "zip", "Zip", {
          readOnly: !isEdit
        })}
      </div>
    );
  }

  renderSchedule() {
    const schedulePropParentPath = ["schedule"];
    const { isEdit } = this.state;
    return (
      <div>
        <h4>Schedule</h4>
        {this.renderInput(schedulePropParentPath, "fromDate", "From", {
          readOnly: !isEdit,
          type: "date"
        })}
        {this.renderInput(schedulePropParentPath, "toDate", "To", {
          readOnly: !isEdit,
          type: "date"
        })}
        {this.renderInput(
          schedulePropParentPath,
          "minDurationDays",
          "Min Duration (in days)",
          {
            readOnly: !isEdit
          }
        )}
        {this.renderSelect(
          schedulePropParentPath,
          "days",
          "Days",
          getDaysOfTheWeekPicklist(),
          {
            multiple: true,
            readOnly: !isEdit,
            disabled: !isEdit
          }
        )}
        {this.renderInput(schedulePropParentPath, "hoursPerDay", "Hours/day", {
          readOnly: !isEdit
        })}
      </div>
    );
  }

  doSubmit = async () => {
    await this.save();
  };

  async populateOpportunity() {
    try {
      const { _id } = this.state.data;
      if (!_id) return;

      const { data: opportunity } = await getOpportunity(_id);
      this.setState({ data: this.mapToViewModel(opportunity) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  save = async () => {
    const { data: opportunity } = await saveOpportunity(this.state.data);
    if (this.state.isNew)
      this.props.history.push(`/opportunities/${opportunity._id}`);
    else
      this.setState({ data: this.mapToViewModel(opportunity), isEdit: false });
  };

  onCancel = () => {
    const { isNew } = this.state;
    if (isNew) this.props.history.push("/opportunities");
    else {
      this.setState(this.prevState);
      this.prevState = null;
    }
  };

  onApply = e => {
    e.preventDefault();
    const { _id: oppId } = this.state.data;
    this.props.history.push(`/opportunities/${oppId}/applications/new`);
  };

  onEdit = e => {
    e.preventDefault();
    this.prevState = _.cloneDeep(this.state);
    this.setState({ isEdit: true });
  };

  onDelete = async e => {
    e.preventDefault();
    try {
      const { _id } = this.state.data;
      await deleteOpportunity(_id);
      this.props.history.push("/opportunities");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error(ex.response.message);
    }
  };

  renderActions() {
    const { isEdit, user } = this.state;
    const { isStaff } = user;
    return (
      <div className="btn-group">
        {isEdit && this.renderSubmit("save", "Save")}

        {isEdit && this.renderReset("cancel", "Cancel")}

        {!isEdit && (
          <Button name="apply" label="Apply" onClick={e => this.onApply(e)} />
        )}

        {!isEdit && isStaff && (
          <Button name="edit" label="Edit" onClick={e => this.onEdit(e)} />
        )}

        {!isEdit && isStaff && (
          <Button
            name="delete"
            label="Delete"
            onClick={e => this.onDelete(e)}
          />
        )}
      </div>
    );
  }
  render() {
    const { isEdit } = this.state;
    return (
      <div>
        <h1>Opportunity</h1>
        <form onSubmit={this.handleSubmit} onReset={this.onCancel}>
          {this.renderInput(null, "_id", "Id", { readOnly: true })}
          {this.renderInput(null, "title", "Title", { readOnly: !isEdit })}
          {this.renderTextArea(null, "description", "Description", {
            readOnly: !isEdit
          })}
          {this.renderInput(null, "email", "Email", { readOnly: !isEdit })}
          {this.renderLocation()}
          {this.renderSchedule()}
          {this.renderActions()}
        </form>
      </div>
    );
  }
}

OpportunityForm.propTypes = {
  isNew: PropTypes.bool,
  history: PropTypes.shape({
    replace: PropTypes.func,
    push: PropTypes.func
  }),
  match: PropTypes.shape({
    params: {
      id: PropTypes.string
    }
  })
};

export default OpportunityForm;
