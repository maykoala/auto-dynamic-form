import React from "react";
import { Form } from "../../src";

const Fields = [
  {
    name: "single-select",
    type: "select",
    label: "Single Select",
    placeholder: "Please select a kind of fruit",
    options: [
      {
        value: "apple",
        label: "Apple"
      },
      {
        value: "banana",
        label: "Banana"
      },
      {
        value: "orange",
        label: "Orange"
      },
      {
        value: "kiwi",
        label: "Kiwi"
      }
    ]
  },
  {
    name: "multiple-select",
    type: "select",
    label: "Multiple Select[Filter]",
    placeholder: "Please select several kinds of fruit",
    multiple: true,
    filterOption: true,
    options: [
      {
        value: "apple",
        label: "Apple"
      },
      {
        value: "banana",
        label: "Banana"
      },
      {
        value: "orange",
        label: "Orange"
      },
      {
        value: "kiwi",
        label: "Kiwi"
      }
    ]
  }
];

const Values = {
  "multiple-select": "orange"
};
export class Selects extends React.Component {
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
          Different Kinds Of Selects{" "}
        </h2>
        <Form fields={Fields} values={Values} onSubmit={this.onSubmit} />
      </div>
    );
  }
}
