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
  TimePicker
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
    switch (type) {
      case "plain-text":
        return getFieldDecorator(name, { rules })(
          <span className="ant-form-text" />
        );
      case "text":
        return getFieldDecorator(name, { rules })(<Input {...rest} />);
      case "number":
        return getFieldDecorator(name, { rules })(<InputNumber {...rest} />);
      case "textarea":
        return getFieldDecorator(name, { rules })(<TextArea {...rest} />);
      case "password":
        return getFieldDecorator(name, { rules })(<Password {...rest} />);
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
        return getFieldDecorator(name, { rules })(<DatePicker {...rest} />);
      case "time":
        return getFieldDecorator(name, { rules })(<TimePicker {...rest} />);
      case "date-time":
        return getFieldDecorator(name, { rules })(
          <DatePicker showTime {...rest} />
        );
      case "week":
        return getFieldDecorator(name, { rules })(<WeekPicker {...rest} />);
      case "month":
        return getFieldDecorator(name, { rules })(<MonthPicker {...rest} />);
      case "date-range":
        return getFieldDecorator(name, { rules })(<RangePicker {...rest} />);

      case "switch":
        return getFieldDecorator(name, { rules })(
          <Switch {...rest} checked={value} />
        );
    }
  };

  const isLabel = type === "label";
  if (isLabel) {
    return <Form.Item label={label} {...restInit} colon={false} />;
  }
  return (
    <Form.Item label={label}>{!isLabel && getField({ ...restInit })}</Form.Item>
  );
};

export class Field extends React.Component {
  render() {
    const { param, getFieldDecorator } = this.props;
    if (utils.isDivider(param)) {
      return <hr />;
    } else if (utils.isTitle(param)) {
      return <p style={param.style}>{param.text}</p>;
    } else {
      return <Fieldset {...param} getFieldDecorator={getFieldDecorator} />;
    }
  }
}
