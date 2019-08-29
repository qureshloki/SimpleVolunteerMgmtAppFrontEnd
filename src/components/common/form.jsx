import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import Button from "./button";
import TextArea from "./textArea";
import { isBlank } from "../../utils/util";
import _ from "lodash";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (const item of error.details)
      _.set(errors, this.getFullPropertyPath(item.path), item.message);
    return errors;
  };

  getFullPropertyPath(parentPath, name = "") {
    parentPath = parentPath || [];
    return _.join([...parentPath, name], ".");
  }

  validateProperty = (propPath, value) => {
    const schema = _.get(this.schema, propPath);
    const { error } = Joi.validate(value, schema);
    return error ? error.details[0].message : null;
  };

  getSelectValues(select) {
    const vals = _.map(
      _.filter(select.options, opt => opt.selected),
      opt => opt.value
    );
    return vals.length > 0 ? vals : undefined;
  }

  handleChange = (propPath, event) => {
    const data = _.cloneDeep(this.state.data);
    const { currentTarget: input } = event;
    let value =
      input.type !== "select-multiple"
        ? input.value
        : this.getSelectValues(input);
    if (!isBlank(value)) _.set(data, propPath, value);
    else {
      _.unset(data, propPath);
      value = undefined;
    }

    const errors = _.cloneDeep(this.state.errors);
    const errorMessage = this.validateProperty(propPath, value);
    if (errorMessage) _.set(errors, propPath, errorMessage);
    else _.unset(errors, propPath);

    this.setState({ data, errors });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  renderInput(parentPath, name, label, rest = {}) {
    const { data, errors } = this.state;
    const propPath = this.getFullPropertyPath(parentPath, name);
    if (!rest.type) rest.type = "text";
    return (
      <Input
        name={name}
        label={label}
        value={_.get(data, propPath) || ""}
        onChange={e => this.handleChange(propPath, e)}
        error={_.get(errors, propPath)}
        {...rest}
      />
    );
  }

  renderTextArea(parentPath, name, label, rest = {}) {
    const { data, errors } = this.state;
    const propPath = this.getFullPropertyPath(parentPath, name);
    return (
      <TextArea
        name={name}
        label={label}
        value={_.get(data, propPath) || ""}
        onChange={e => this.handleChange(propPath, e)}
        error={_.get(errors, propPath)}
        {...rest}
      />
    );
  }

  renderSelect(parentPath, name, label, options, rest = {}) {
    const { data, errors } = this.state;
    const propPath = this.getFullPropertyPath(parentPath, name);
    return (
      <Select
        name={name}
        label={label}
        options={options}
        value={_.get(data, propPath) || []}
        onChange={e => this.handleChange(propPath, e)}
        error={_.get(errors, propPath)}
        {...rest}
      />
    );
  }

  renderSubmit(name, label, rest = {}) {
    return (
      <Button
        name={name}
        label={label}
        disabled={this.validate()}
        type="submit"
        {...rest}
      />
    );
  }

  renderReset(name, label, rest = {}) {
    return <Button name={name} label={label} type="reset" {...rest} />;
  }
}

export default Form;
