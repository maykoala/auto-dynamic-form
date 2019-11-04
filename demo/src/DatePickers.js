import React from "react";
import { Form } from "../../src";

const Fields = [
  {
    name: "date-picker",
    label: "Date",
    type: "date"
  },
  {
    name: "date-picker-with-default",
    label: "Date with Default",
    type: "date",
    defaultValue: "2019-10-27T01:23:20.384Z"
  },
  {
    name: "time-picker",
    label: "Time",
    type: "time"
  },
  {
    name: "time-picker-with-default",
    label: "Time with Default",
    type: "time",
    defaultValue: "2019-10-31T09:06:19.000Z"
  },
  {
    name: "date-time-picker",
    label: "DatetTme",
    type: "date-time"
  },
  {
    name: "date-time-picker-with-default",
    label: "DateTime with Default",
    type: "date-time",
    defaultValue: "2019-10-18T01:43:44.333Z"
  },
  {
    name: "week-picker",
    label: "Week",
    type: "week"
  },
  {
    name: "week-picker-with-default",
    label: "Week with Default",
    type: "week",
    defaultValue: "2019-10-31T09:06:19.000Z"
  },
  {
    name: "month-picker",
    label: "Month",
    type: "month"
  },
  {
    name: "month-picker-with-default",
    label: "Month with Default",
    type: "month",
    defaultValue: "2019-10-31T09:06:19.000Z"
  },
  {
    name: "range-picker",
    label: "Date Range",
    type: "date-range"
  },
  {
    name: "range-picker-with-default",
    label: "Date Range with Default",
    type: "date-range",
    defaultValue: ["2019-10-1T09:06:19.000Z", "2019-10-31T09:06:19.000Z"]
  },
  {
    name: "range-picker-with-time",
    label: "Time Range",
    type: "date-range",
    showTime: true
  },
  {
    name: "range-picker-with-time-and-default",
    label: "Time Range with Default",
    type: "date-range",
    showTime: true,
    defaultValue: ["2019-10-1T09:06:19.000Z", "2019-10-31T09:06:19.000Z"]
  }
];

const Config = {
  form: {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }
};

export class DatePickers extends React.Component {
  handleSubmit = ({ validateFields }) => {
    validateFields((error, values) => {
      if (!error) {
        console.log(`Received values of form: ${JSON.stringify(values)}`);
      } else {
        console.log(`error: ${JSON.stringify(error)}`);
      }
    });
  }

  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center", margin: "40px 0" }}>
          {" "}
          Different Kinds Of DatePickers{" "}
        </h2>
        <Form fields={Fields} onSubmit={this.handleSubmit} config={Config}/>
      </div>
    );
  }
}
