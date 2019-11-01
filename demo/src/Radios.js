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

export class Radios extends React.Component {
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
          Different Kinds Of Radios{" "}
        </h2>
        <Form fields={Fields} onSubmit={this.onSubmit} />
      </div>
    );
  }
}
