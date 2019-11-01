import React from 'react';
import { Form, Button  } from 'antd';
import { Field } from './Field';
import {each, omit, pickBy} from 'lodash-es';

class CustomizedForm extends React.Component {
    render() {
        const {onSubmit, fields} = this.props;
        const {validateFields, getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
            };

        return (
        <Form {...formItemLayout} onSubmit={(e) => onSubmit(validateFields, e)}>
            {fields.map(field => (
                <Field
                    key={field.name}
                    param={omit(field, ['touched', 'dirty', 'validating'])}
                    getFieldDecorator = {getFieldDecorator}
                />)
            )}
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
        );
    }
     
}

export const EnhancedForm = Form.create({
    onFieldsChange(props, changedFields) {
        const successFields = pickBy(changedFields, field => field.error === undefined);
        props.onChange(successFields);
    },

    mapPropsToFields(props) { // need to more convention
        const formFields = {};
        each(props.fields, field => {
            formFields[field.name] = Form.createFormField({
                ...field
            })
        });

        return formFields;
    },
  })(CustomizedForm);