import React from "react";
import { Form } from "../../src";

const Fields = [
  {
    name: "text-section",
    label: "Text",
    type: "label"
  },
  {
    name: "text-example",
    type: "text",
    label: "Text",
    placeholder: "Please input text",
    rules: [
      {
        required: true,
        message: "Please input text"
      }
    ]
  },
  {
    name: "disabled-text-example",
    type: "text",
    label: "Disabled Text",
    defaultValue: "Disabled Text",
    disabled: true
  },
  {
    name: "large-text-example",
    type: "text",
    label: "Large Text",
    placeholder: "Please input large text",
    size: "large"
  },
  {
    name: "number-section",
    label: "Number",
    type: "label"
  },
  {
    name: "number-example",
    type: "number",
    label: "Number",
    placeholder: "Please input number",
    defaultValue: 3,
    rules: [
      {
        validator: async (rule, value) => {
          if (value < 1) throw new Error("The number couldn't be less than 1");
          else if (value > 10)
            throw new Error("The number couldn't be greater than 10");
        }
      },
      { type: "number" }
    ]
  },
  {
    name: "disabled-number-example",
    type: "number",
    label: "Disabled Number",
    placeholder: "Please input number",
    min: 1,
    max: 10,
    defaultValue: 5,
    disabled: true
  },
  {
    name: "password-section",
    label: "Password",
    type: "label"
  },
  {
    name: "password-example",
    label: "Password",
    type: "password"
  },
  {
    name: "text-area-section",
    label: "TextArea",
    type: "label"
  },
  {
    name: "text-area-example",
    label: "TextArea",
    type: "textarea",
    rows: 4
  },
  {
    name: "auto-size-height-text-area-example-1",
    label: "AutoSize TextArea",
    type: "textarea",
    placeholder: "Autosize height based on content lines",
    autoSize: true
  },
  {
    name: "auto-size-height-text-area-example-2",
    label: "AutoSize TextArea",
    type: "textarea",
    placeholder: "Autosize height with minimum and maximum number of lines",
    autoSize: true
  },
  {
    name: "auto-size-height-text-area-example-3",
    label: "AutoSize TextArea",
    type: "textarea",
    placeholder: "Controlled autosize",
    autoSize: { minRows: 2, maxRows: 6 }
  },
  {
    name: "input-section",
    label: "Other Properties",
    type: "label"
  },
  {
    name: "prefix-suffix-input",
    label: "Prefix and Suffix",
    prefix: "￥",
    suffix: "RMB"
  },
  {
    name: "allow-clrea-input",
    label: "Allow Clear",
    placeholder: "Input with clear icon",
    allowClear: true
  }
];

const Values = {
  "text-example": "I'm a basic input.",
  "number-example": 5
};

const Config = {
  form: {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  }
};

export class Inputs extends React.Component {
  handleSubmit = ({ validateFields }) => {
    validateFields((error, values) => {
      if (!error) {
        console.log(`Received values of form: ${JSON.stringify(values)}`);
      } else {
        console.log(`error: ${JSON.stringify(error)}`);
      }
    });
  };

  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center", margin: "40px 0" }}>
          Different Kinds Of Inputs
        </h2>
        <Form
          fields={Fields}
          values={Values}
          onSubmit={this.handleSubmit}
          config={Config}
        />
      </div>
    );
  }
}
