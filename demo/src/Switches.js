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

export class Switches extends React.Component {
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
          Different Kinds Of Switches{" "}
        </h2>
        <Form fields={Fields} onSubmit={this.onSubmit} />
      </div>
    );
  }
}
