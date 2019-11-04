# auto-dynamic-form

  Build dynamic forms automatically in React with **data** only.

  Speed up your multi-form projects :rocket:.

<br>

## Note
This project is only just begining :writing_hand:. More features are coming soon :zap:.

<br>

## Installation

`npm install --save auto-dynamic-form`

## Get Started

### Auto
Auto-dynamic-form receives some props to define a form: fields, values, onSubmit, and config. 
#### fields
It is an array of object. Each object has "name", "label", "type" and the other properties.
#### values
It is an optional object. Mostly it's getting from DB. You don't need to set it if no values at start.
#### onSubmit
It is a handler with a param **form**. You can get values, do validations via it.
#### config
You can config form's layout, wrapperCol, labelCol, and colon here.

### Dynamic
The keyword **requires** is used here to define dependencies between elements. If one element A requires the other one B, which means we could see A only when B meets the requirement. Now we support requirement keywords: $in, $or, $exist, $nonExist, $nonEmpty.

### Easyyyy
Auto-dynamic-form uses [Ant Design](https://ant.design) as the basic UI, that's to say you can customize elements almost the same as in [Ant Design](https://ant.design). For example, you can set an element to different types: text, number, password, textarea, date (standing for datepicker), switch, radio and so on.


### Demo

![Demo Image](https://raw.githack.com/maykoala/auto-dynamic-form/master/assets/images/demo.gif)
```javascript
import React from "react";
import { Form } from "auto-dynamic-form";
import { Row, Col, Button } from "antd";

const Fields = [
  {
    name: "basic-requires-section",
    type: "title",
    text: "Basic Dynamic Section: requires, $nonEmpty"
  },
  {
    name: "fixedDate",
    label: "Fixed Date",
    type: "switch"
  },
  {
    name: "date-picker",
    label: "Date",
    type: "date",
    requires: {
      fixedDate: true
    }
  },

  {
    name: "favoriteFruit",
    type: "select",
    label: "Favorite Fruit",
    placeholder: "Please select a kind of fruit",
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
      },
      {
        value: "other",
        label: "Other"
      }
    ]
  },
  {
    name: "apple",
    label: "Why is Apple",
    type: "textarea",
    requires: {
      favoriteFruit: "apple"
    }
  },
  {
    name: "banana",
    label: "Why is Banana",
    type: "textarea",
    requires: {
      favoriteFruit: "banana"
    }
  },
  {
    name: "orange",
    label: "Why is Orange",
    type: "textarea",
    requires: {
      favoriteFruit: "orange"
    }
  },
  {
    name: "kiwi",
    label: "Why is Kiwi",
    type: "textarea",
    requires: {
      favoriteFruit: "kiwi"
    }
  },
  {
    name: "otherFruite",
    label: "Other Favorite Fruit",
    placeholder: "Please input your favorite fruit",
    type: "text",
    requires: {
      favoriteFruit: "other"
    }
  },
  {
    name: "otherFruiteReason",
    label: "Why is that",
    type: "textarea",
    requires: {
      otherFruite: "$nonEmpty"
    }
  },
  {
    name: "advanced-requires-section-in",
    text: "Advanced Requires Section: $in",
    type: "title"
  },
  {
    name: "favoriteActivities",
    type: "select",
    label: "Favorite Activities",
    placeholder: "Please select your favorite activities",
    multiple: true,
    filterOption: true,
    options: [
      {
        value: "guitar",
        label: "Play the Guitar"
      },
      {
        value: "violino",
        label: "Play the Violino"
      },
      {
        value: "cello",
        label: "Play the Cello"
      },
      {
        value: "football",
        label: "Play Football"
      },
      {
        value: "basketball",
        label: "Play Basketball"
      },
      {
        value: "swim",
        label: "Swim"
      }
    ]
  },
  {
    name: "musician",
    label: "Wow! You're a Musician! Right?",
    type: "switch",
    requires: {
      favoriteActivities: {
        $in: ["guitar", "violino", "cello"]
      }
    }
  },
  {
    name: "sporter",
    label: "Wow! You're a Sporter! Right?",
    type: "switch",
    requires: {
      favoriteActivities: {
        $in: ["football", "basketball", "swim"]
      }
    }
  },
  {
    name: "musician-sporter",
    label: "Wow! You're a Musician and a Sporter! Right?",
    type: "switch",
    requires: {
      musician: "$nonExist",
      sporter: "$nonExist",
      favoriteActivities: "$nonEmpty"
    }
  },
  {
    name: "advanced-requires-section-or",
    text: "Advanced Requires Section: $or",
    type: "title"
  },
  {
    name: "favoriteColors",
    type: "select",
    label: "Favorite Colors",
    placeholder: "Please select your favorite color",
    multiple: true,
    filterOption: true,
    options: [
      {
        value: "black",
        label: "Black"
      },
      {
        value: "white",
        label: "White"
      },
      {
        value: "red",
        label: "Red"
      },
      {
        value: "yellow",
        label: "Yellow"
      },
      {
        value: "green",
        label: "Green"
      },
      {
        value: "blue",
        label: "Blue"
      }
    ]
  },
  {
    name: "like-panda",
    label: "You like panda! Right?",
    type: "switch",
    requires: {
      favoriteColors: {
        $or: ["black", "white"]
      }
    }
  },
  {
    name: "like-rainbow",
    label: "You like rainbow! Right?",
    type: "switch",
    requires: {
      favoriteColors: {
        $or: ["red", "blue", "green"]
      }
    }
  }
];

const Config = {
  form: {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }
};

export class Dynamic extends React.Component {
  handleSubmit = ({ validateFields }) => {
    validateFields((error, values) => {
      if (!error) {
        console.log(`Received values of form: ${JSON.stringify(values)}`);
      } else {
        console.log(`error: ${JSON.stringify(error)}`);
      }
    });
  }

  handleReset = ({resetFields}) => {
    resetFields();
  };

  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center", margin: "40px 0" }}>
          Different Kinds Of Dynamic
        </h2>
        <Form fields={Fields} config={Config} onSubmit={this.handleSubmit}>
          {form => {
            return (
              <Row>
                <Col offset={6} span={14}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button
                    style={{ marginLeft: 8 }}
                    onClick={this.handleReset.bind(this, form)}
                  >
                    Reset
                  </Button>
                </Col>
              </Row>
            );
          }}
        </Form>
      </div>
    );
  }
}


```
