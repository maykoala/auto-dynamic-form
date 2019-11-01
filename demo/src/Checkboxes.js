import React from "react";
import { Form } from "../../src";

const Fields = [
  {
    name: "basic-checkbox",
    label: "Basic Checkbox",
    type: "checkbox",
    defaultValue: true
  },
  {
    name: "checkbox-group",
    label: "Checkbox Group",
    type: "checkbox",
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
    defaultValue: ["peach", "watermelon"]
  }
];

export class Checkboxes extends React.Component {
  onSubmit = (error, values) => {
    if (!error) {
      console.log(`Received values of form: ${JSON.stringify(values)}`);
    } else {
      console.log(`error: ${error}`);
    }
  };

  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center", margin: "40px 0" }}>
          {" "}
          Different Kinds Of Checkboxes{" "}
        </h2>
        <Form fields={Fields} onSubmit={this.onSubmit} />
      </div>
    );
  }
}
