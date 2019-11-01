import _ from "lodash";
import moment from "moment";

const DEFAULT_EMPTY_VALUE = "";

export const utils = {
  getDisplayedFields,
  isText,
  isNumber,
  isTextArea,
  isSelect,
  isSingleSelect,
  isMultiSelect,
  isCheckbox,
  isCheckboxGroup,
  isRadioGroup,
  isRadioButtonGroup,
  isDate,
  isTime,
  isDateTime,
  isWeek,
  isMonth,
  isDateRange,
  isSwitch,
  isLabel,
  isTitle,
  isDivider,
  isPassword
};

function findByName(list, name) {
  return _.find(list, function(l) {
    return l.name == name;
  });
}

function selectValuesToDisplay(value, valueEnums) {
  // 单选 value是string, 需返回obj
  // 多选value是array, 需返回array
  if (value == null) return value;

  if (_.isArray(value)) {
    // 多选
    return _.map(value, curV => {
      let targetVE = _.find(valueEnums, curVE => curVE.value === curV);
      return { value: curV, label: targetVE.label };
    });
  } else {
    let targetVE = _.find(valueEnums, curVE => curVE.value === value);

    return { value, label: targetVE.label };
  }
}

function selectDisplayToValues(options, valueEnums) {
  if (options == null) return options;

  if (_.isArray(options)) {
    return _.map(options, curO => curO.value);
  } else {
    return options.value;
  }
}

function getComposedParams(params, changedFields, init) {
  if (changedFields == null) return;

  let fields = changedFields;
  if (init) {
    _.each(Object.entries(changedFields), ([name, value]) => {
      fields[name] = { name, value };
    });
  }

  _.each(fields, (props, name) => {
    let targetParam = findByName(params, name);
    if (targetParam != null) {
      _.assign(targetParam, props);
    }
  });
}

function $inOp(value, $inArray) {
  if (_.isEmpty(value)) return false;
  if (_.isArray(value)) {
    return _.every(value, val => $inArray.indexOf(val) >= 0);
  } else {
    return $inArray.indexOf(value) >= 0;
  }
}

function $orOp(value, $orArray) {
  if (_.isEmpty(value)) return false;
  if (_.isArray(value)) {
    return _.intersection(value, $orArray).length > 0;
  } else {
    return $orArray.indexOf(value) >= 0;
  }
}
function requiresInParams(requires, parameters, displayedParams) {
  return _.every(requires, function(req, key) {
    let param = null;
    if (req === "$nonExist") {
      param = findByName(displayedParams, key);
      if (param == null) return true;
    } else if (req === "$exist") {
      param = findByName(displayedParams, key);
      if (param != null) return true;
    }

    param = findByName(parameters, key);
    if (param == null)
      return false;

    const { value } = param;

    if (req === "$nonEmpty") {
      return value != null && !_.isEmpty(value);
    } else if (_.has(req, "$in")) {
      return $inOp(value, req["$in"]);
    } else if (_.has(req, "$contain")) {
      return $inOp(req["$contain"], value);
    } else if (_.has(req, "$or")) {
      return $orOp(value, req["$or"]);
    }

    return req === value;
  });
}

function isText(param) {
  return (
    param.valueEnums == null && (param.type == null || param.type === "text")
  );
}

function isNumber(param) {
  return param.type === "number";
}

function isTextArea(param) {
  return param.type === "textarea";
}

function isSelect(param) {
  return param.type === "select";
}

function isSingleSelect(param) {
  return isSelect(param) && !isMultiSelect(param);
}

function isMultiSelect(param) {
  return isSelect(param) && param.multiple;
}

function isCheckbox(param) {
  return param.type === "checkbox";
}

function isCheckboxGroup(param) {
  return isCheckbox(param) && param.group;
}

function isRadio(param) {
  return param.type === "radio";
}

function isRadioGroup(param) {
  return isRadio(param) && param.group;
}

function isRadioButtonGroup(param) {
  return isRadio(param) && param.button;
}

function isDate(param) {
  return param.type === "date";
}

function isTime(param) {
  return param.type === "time";
}

function isDateTime(param) {
  return param.type === "date-time";
}

function isWeek(param) {
  return param.type === "week";
}

function isMonth(param) {
  return param.type === "month";
}

function isDateRange(param) {
  return param.type === "date-range";
}

function isSwitch(param) {
  return param.type === "switch";
}

function isLabel(param) {
  return param.type === "label";
}

function isTitle(param) {
  return param.type === "title";
}

function isPassword(param) {
  return param.type === "password";
}

function isDivider(param) {
  return param.type === "divider";
}

function getDisplayedFields(params, changedFields, init = false) {
  getComposedParams(params, changedFields, init);

  let displayedParams = [];

  _.each(params, param => {
    if (requiresInParams(param.requires, params, displayedParams)) {
      let { defaultValue, type, valueEnums, value } = param;

      if (
        (isCheckbox(param) || isRadio(param || isSwitch(param))) &&
        defaultValue == null
      ) {
        defaultValue = param.defaultChecked;
      }

      if (
        (isDate(param) ||
          isTime(param) ||
          isDateTime(param) ||
          isWeek(param) ||
          isMonth(param) ||
          isDateRange(param)) &&
        defaultValue == null
      ) {
        defaultValue = param.defaultPickerValue;
      }

      if (!_.has(param, "value")) {
        if (defaultValue != null) {
          param.value = defaultValue;
        }
      }

      delete param.defaultValue;

      const _isDateRange = isDateRange(param);
      if (param.value != null) {
        if (
          isDate(param) ||
          isTime(param) ||
          isDateTime(param) ||
          isWeek(param) ||
          isMonth(param)
        ) {
          param.value = moment(param.value, moment.HTML5_FMT.DATETIME_LOCAL_MS);
        } else if (_isDateRange) {
          param.value = _.map(param.value, val =>
            moment(val, moment.HTML5_FMT.DATETIME_LOCAL_MS)
          );
        }
      }

      const hasStyle = _.has(param, "style");
      if (_isDateRange) {
        param.format = param.format || "YYYY-MM-DD HH:mm";
        if (param.showTime) {
          param.placeholder = param.placeholder || ["Start Time", "End Time"];
        }
      } else if (isLabel(param) && !hasStyle) {
        param.style = { fontWeight: "bold" };
      } else if (isTitle(param) && !hasStyle) {
        param.style = {
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "1.1rem"
        };
      }

      displayedParams.push(param);
    } else {
      delete param.value;
    }
  });

  return displayedParams;
}
