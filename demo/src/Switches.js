import React from "react";
import { Form } from "../../src";

const Fields = [
  {
    name: "switch",
    label: "Switch",
    type: "switch"
  },
  {
    name: "switch-with-default",
    label: "Switch with Default",
    type: "switch",
    defaultValue: true
  }
];

const Config = {
  form: {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  }
};

export class Switches extends React.Component {
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
          Different Kinds Of Switches
        </h2>
        <Form fields={Fields} onSubmit={this.handleSubmit} config={Config} />
      </div>
    );
  }
}
