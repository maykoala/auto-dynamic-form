import React from "react";
import { Form } from "../../src";

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

export class Dynamic extends React.Component {
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
          Different Kinds Of Dynamic
        </h2>
        <Form fields={Fields} onSubmit={this.onSubmit} />
      </div>
    );
  }
}
