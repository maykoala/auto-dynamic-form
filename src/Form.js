import React from "react";
import { utils } from "./utils";
import { EnhancedForm } from "./EnhancedForm";

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = utils.getInitialFields(this.props);
  }

  handleChangedFields = changedFields => {
    const { originalFields } = this.state;
    this.setState({
      changedFields: utils.getDisplayedFields(originalFields, changedFields)
    });
  };

  handleSubmit = (form, event) => {
    event.preventDefault();
    this.props.onSubmit(form);
  };

  resetFields = names => {
    if (names == null || names.length === 0) {
      this.setState(utils.getInitialFields(this.props));
    } else {
      const { originalFields } = this.state;
      originalFields.forEach(field => {
        if (names.includes(field.name)) {
          field.value = undefined;
        }
      });
      this.setState({
        changedFields: utils.getDisplayedFields(originalFields)
      });
    }
  };

  render() {
    const { changedFields } = this.state;
    const { children } = this.props;

    const { config = {} } = this.props;

    return (
      <EnhancedForm
        fields={changedFields}
        config={config}
        onChangedFields={this.handleChangedFields}
        onSubmit={this.handleSubmit}
        resetFields={this.resetFields}
        children={children}
      />
    );
  }
}
