import React from "react";
import { utils } from "./utils";

import {
  Form,
  Input,
  InputNumber,
  Select,
  Checkbox,
  Radio,
  Switch,
  DatePicker,
  TimePicker,
  Button,
  Icon
} from "antd";

const { WeekPicker, MonthPicker, RangePicker } = DatePicker;
const { Password, TextArea } = Input;

const Fieldset = ({ label, type = "text", ...restInit }) => {
  // rules, initialvalue
  const getField = ({
    getFieldDecorator,
    name,
    value,
    group,
    options,
    rules,
    ...rest
  }) => {
    const decoratorOptions = { rules, initialValue: value };
    switch (type) {
      case "plain-text":
        return getFieldDecorator(name, { rules })(
          <span className="ant-form-text" />
        );
      case "text":
        return getFieldDecorator(name, decoratorOptions)(<Input {...rest} />);
      case "number":
        return getFieldDecorator(
          name,
          decoratorOptions
        )(<InputNumber {...rest} />);
      case "textarea":
        return getFieldDecorator(
          name,
          decoratorOptions
        )(<TextArea {...rest} />);
      case "password":
        return getFieldDecorator(
          name,
          decoratorOptions
        )(<Password {...rest} />);
      case "select":
        const { multiple, ...selectRest } = rest;
        return getFieldDecorator(name, { rules })(
          <Select {...selectRest} mode={multiple ? "multiple" : ""}>
            {options.map(({ value, label }) => {
              return (
                <Select.Option value={value} key={value}>
                  {label}
                </Select.Option>
              );
            })}
          </Select>
        );
      case "checkbox":
        return group
          ? getFieldDecorator(name, { rules })(
              <Checkbox.Group {...{ rest, options }} />
            )
          : getFieldDecorator(name, { rules })(
              <Checkbox {...rest} checked={value} />
            );
      case "radio":
        const { button, ...radioRest } = rest;
        return button
          ? getFieldDecorator(name, { rules })(
              <Radio.Group {...radioRest}>
                {options.map(({ value, label }) => {
                  return (
                    <Radio.Button value={value} key={value}>
                      {label}
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            )
          : getFieldDecorator(name, { rules })(
              <Radio.Group {...{ radioRest, options }} />
            );
      case "date":
        return getFieldDecorator(
          name,
          decoratorOptions
        )(<DatePicker {...rest} />);
      case "time":
        return getFieldDecorator(
          name,
          decoratorOptions
        )(<TimePicker {...rest} />);
      case "date-time":
        return getFieldDecorator(
          name,
          decoratorOptions
        )(<DatePicker showTime {...rest} />);
      case "week":
        return getFieldDecorator(
          name,
          decoratorOptions
        )(<WeekPicker {...rest} />);
      case "month":
        return getFieldDecorator(
          name,
          decoratorOptions
        )(<MonthPicker {...rest} />);
      case "date-range":
        return getFieldDecorator(
          name,
          decoratorOptions
        )(<RangePicker {...rest} />);

      case "switch":
        return getFieldDecorator(name, { rules })(
          <Switch {...rest} checked={value} />
        );
    }
  };

  return getField({ ...restInit });
};

export class Field extends React.Component {
  remove = (name, k) => {
    const { form } = this.props;
    const keysFieldName = utils.getKeysFieldName(name);

    // can use data-binding to get
    const keys = form.getFieldValue(keysFieldName);
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      [keysFieldName]: keys.filter(key => key !== k)
    });
  };

  add = name => {
    const { form } = this.props;
    const keysFieldName = utils.getKeysFieldName(name);
    // can use data-binding to get
    const keys = form.getFieldValue(keysFieldName);
    const curId = keys.length > 0 ? keys[keys.length - 1] + 1 : 0;
    const nextKeys = [...keys, curId];
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      [keysFieldName]: nextKeys
    });
  };

  render() {
    const {
      param,
      form,
      formItemLayout,
      formItemLayoutWithOutLabel
    } = this.props;
    const { getFieldDecorator } = form;
    if (utils.isDivider(param)) {
      return <hr />;
    } else if (utils.isTitle(param)) {
      return <p style={param.style}>{param.text}</p>;
    } else if (utils.isLabel(param)) {
      const { label, type, ...restInit } = param;
      console.log(`resinit: ${JSON.stringify(restInit)}`);
      return <Form.Item label={label} {...restInit} colon={false} />;
    } else if (utils.isLoop(param)) {
      const { name, label, keys = [], value = {}, loopedType } = param;
      return (
        <React.Fragment>
          {keys.map((k, index) => (
            <Form.Item
              {...(index === 0
                ? { formItemLayout }
                : formItemLayoutWithOutLabel)}
              label={index === 0 ? label : ""}
              key={k}
            >
              {/* {getFieldDecorator(utils.getLoopedFieldName(name, k), {
                initialValue: value[k]
              })( */}
              <Fieldset
                name={utils.getLoopedFieldName(name, k)}
                type={loopedType}
                value={value[k]}
                getFieldDecorator={getFieldDecorator}
                style={{ width: "80%", marginRight: 8 }}
              />
              {/* )} */}
              {keys.length > 1 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  onClick={this.remove.bind(this, name, k)}
                />
              ) : null}
            </Form.Item>
          ))}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button
              type="dashed"
              onClick={this.add.bind(this, name)}
              style={{ width: "80%" }}
            >
              <Icon type="plus" /> Add field
            </Button>
          </Form.Item>
        </React.Fragment>
      );
    } else if (utils.isKey(param)) {
      const { name, value } = param;
      return getFieldDecorator(name, { initialValue: value })(<div></div>);
    } else {
      const { label, type, restInit } = param;
      return (
        <Form.Item label={label}>
          <Fieldset {...param} getFieldDecorator={getFieldDecorator} />
        </Form.Item>
      );
    }
  }
}
