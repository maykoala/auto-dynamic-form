import React from "react";
import { Form, Button } from "antd";
import { Field } from "./Field";
import { each, omit, pickBy } from "lodash-es";
import { isEmpty } from "lodash-es";

class CustomizedForm extends React.Component {

  render() {
    const { onSubmit, fields, config, children, resetFields } = this.props;

    const formProps = this.props.form;

    formProps.resetFields = resetFields;

    const { getFieldDecorator } = formProps;

    const { form = {}} = config;

    const { labelCol = {} } = form;
    let buttonLayout = {};

    if (!isEmpty(labelCol)) {
      const { offset = 0, span = 0 } = labelCol;
      buttonLayout = { wrapperCol: { offset: offset + span } };
    }

    return (
      <Form {...form} onSubmit={e => onSubmit(formProps, e)}>
        {fields.map(field => (
          <Field
            key={field.name}
            param={omit(field, ["touched", "dirty", "validating"])}
            getFieldDecorator={getFieldDecorator}
          />
        ))}
        {children ? (
          typeof children === "function" ? (
            children.call(this, formProps)
          ) : (
            childen
          )
        ) : (
          <Form.Item {...buttonLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        )}
      </Form>
    );
  }
}



export const EnhancedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChangedFields(changedFields);
  },

  mapPropsToFields({ fields }) {
    const formFields = {};
    each(fields, field => {
      formFields[field.name] = Form.createFormField({
        ...field
      });
    });

    return formFields;
  }
})(CustomizedForm);
