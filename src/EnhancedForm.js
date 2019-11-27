import React from "react";
import { Form, Button } from "antd";
import { Field } from "./Field";
import { each, omit, pickBy } from "lodash-es";
import { isEmpty } from "lodash-es";
import { utils } from "./utils";

class CustomizedForm extends React.Component {

  render() {
    const { onSubmit, fields, config, children, resetFields } = this.props;

    const formProps = this.props.form;

    formProps.resetFields = resetFields;
    const originalValidateFields = formProps.validateFields;
    formProps.validateFields = callback => {
      originalValidateFields((error, values) => {
        const keysFields = [];
        each(values, (val, key) => {
          const targetField = utils.findByName(fields, key);
          if (targetField != null && utils.isKey(targetField)) {
            keysFields.push(targetField);
          }
        });

        each(keysFields, ({name, source, value}) => {
          const result = [];
          each(value, val => {
            const loopedFieldName = utils.getLoopedFieldName(source, val);
            result.push(values[loopedFieldName]);
            delete values[loopedFieldName];
          });
          delete values[name];
          values[source] = result;
        });
        return callback(error, values)
      });
    };

    const { form = {}} = config;

    const { labelCol = {}, wrapperCol = {} } = form;
    let formItemLayoutWithOutLabel = {};

    if (!isEmpty(labelCol)) {
      const { offset = 0, span = 0 } = labelCol;
      formItemLayoutWithOutLabel = { wrapperCol: { offset: offset + span, span: wrapperCol.span }};
    }

    return (
      <Form {...form} onSubmit={e => onSubmit(formProps, e)}>
        {fields.map(field => (
          <Field
            key={field.name}
            param={omit(field, ["touched", "dirty", "validating"])}
            form={formProps}
            formItemLayoutWithOutLabel={formItemLayoutWithOutLabel}
            formItemLayout={form}
          />
        ))}
        {children ? (
          typeof children === "function" ? (
            children.call(this, formProps)
          ) : (
            childen
          )
        ) : (
          <Form.Item {...formItemLayoutWithOutLabel}>
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
