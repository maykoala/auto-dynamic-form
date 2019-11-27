import React from "react";
import { Form } from "../../src";
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
    name: "advanced-requires-section-subsetOf",
    text: "Advanced Requires Section: $subsetOf",
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
        $subsetOf: ["guitar", "violino", "cello"]
      }
    }
  },
  {
    name: "sporter",
    label: "Wow! You're a Sporter! Right?",
    type: "switch",
    requires: {
      favoriteActivities: {
        $subsetOf: ["football", "basketball", "swim"]
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
    name: "advanced-requires-section-intersect-with",
    text: "Advanced Requires Section: $intersectWith",
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
        $intersectWith: ["black", "white"]
      }
    }
  },
  {
    name: "like-rainbow",
    label: "You like rainbow! Right?",
    type: "switch",
    requires: {
      favoriteColors: {
        $intersectWith: ["red", "blue", "green", "yellow"]
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
