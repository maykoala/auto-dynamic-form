import React from "react";
import _ from "lodash";
import { utils } from "./utils";
import { EnhancedForm } from "./EnhancedForm";

export class Form extends React.Component {
  constructor(props) {
    super(props);

    const { fields, values } = this.props;
    const originalFields = _.cloneDeep(fields);
    const changedFields = utils.getDisplayedFields(
      originalFields,
      values,
      true
    );

    this.state = { originalFields, changedFields };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(changedFields) {
    const { originalFields } = this.state;
    this.setState({
      changedFields: utils.getDisplayedFields(originalFields, changedFields)
    });
  }

  handleSubmit(validateFields, event) {
    event.preventDefault();
    const { onSubmit } = this.props;
    validateFields((error, values) => {
      onSubmit(error, values);
    });
  }

  render() {
    const { changedFields } = this.state;

    return (
      <EnhancedForm
        fields={changedFields}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}
