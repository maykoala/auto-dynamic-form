import React from "react";
import { Form } from "../../src";

const Fields = [
  {
    name: "radio-group",
    label: "Radio Group",
    type: "radio",
    group: true,
    options: [
      {
        label: "Peach",
        value: "peach"
      },
      {
        label: "Pitaya",
        value: "pitaya"
      },
      {
        label: "Avocado",
        value: "avocado"
      },
      {
        label: "Guava",
        value: "guava"
      },
      {
        label: "Watermelon",
        value: "watermelon"
      }
    ],
    defaultValue: "guava"
  },
  {
    name: "radio-button-group",
    label: "Radio Button Group",
    type: "radio",
    group: true,
    button: true,
    options: [
      {
        label: "Peach",
        value: "peach"
      },
      {
        label: "Pitaya",
        value: "pitaya"
      },
      {
        label: "Avocado",
        value: "avocado"
      },
      {
        label: "Guava",
        value: "guava"
      },
      {
        label: "Watermelon",
        value: "watermelon"
      }
    ],
    defaultValue: "guava"
  }
];

const Config = {
  form: {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  }
};

export class Radios extends React.Component {
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
          Different Kinds Of Radios
        </h2>
        <Form fields={Fields} onSubmit={this.handleSubmit} config={Config} />
      </div>
    );
  }
}
