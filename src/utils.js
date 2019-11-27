import {
  assign,
  cloneDeep,
  isEmpty,
  has,
  every,
  each,
  intersection,
  omitBy
} from "lodash-es";
import moment from "moment";

export const utils = {
  getInitialFields,
  getDisplayedFields,
  getKeysFieldName,
  getLoopedFieldName,
  findByName,
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
  isPassword,
  isLoop,
  isKey
};

function getKeysFieldName(name) {
  return `${name}Keys`;
}

function getLoopedFieldName(name, key) {
  return name + "~" + "Field" + "~" + key;
}

function getInitialFields({ fields, values }) {
  let originalFields = cloneDeep(fields);

  const keysFields = [];
  each(originalFields, field => {
    if (isLoop(field)) {
      const { name, keys } = field;
      keysFields.push({
        name: getKeysFieldName(name),
        type: "key",
        defaultValue: keys || [],
        requires: { [name]: "$exist" },
        source: name
      });
    }
  });

  originalFields = originalFields.concat(keysFields);

  const changedFields = utils.getDisplayedFields(originalFields, values, true);

  return { originalFields, changedFields };
}

function findByName(list, name) {
  return list.find(l => l.name == name);
}

function getComposedParams(fields, changedFields, init) {
  if (changedFields == null) return;

  if (init) {
    each(Object.entries(changedFields), ([name, value]) => {
      changedFields[name] = { name, value };
    });
  }

  each(changedFields, (props, name) => {
    const targetField = findByName(fields, name);
    if (targetField != null) {
      assign(targetField, props);
      if (!init) {
        if (isKey(targetField)) {
          const sourceField = findByName(fields, targetField.source);
          if (sourceField != null) {
            sourceField.keys = targetField.value;
          }
          sourceField.value = omitBy(
            sourceField.value,
            (val, key) => !sourceField.keys.includes(+key)
          );
        }
      }
    } else {
      const parts = name.split("~");
      if (parts.length === 3 && parts[1] === "Field") {
        // Created Dynamically For Loop
        const sourceField = findByName(fields, parts[0]);
        const value = sourceField.value || {};
        value[parts[2]] = props.value;
        sourceField.value = value;
      }
    }
  });
}

function $subsetOf(value, $set) {
  if (isEmpty(value)) return false;
  if (Array.isArray(value)) {
    return every(value, val => $set.indexOf(val) >= 0);
  } else {
    return $set.indexOf(value) >= 0;
  }
}

function $intersectWith(value, $set) {
  if (isEmpty(value)) return false;
  if (Array.isArray(value)) {
    return intersection(value, $set).length > 0;
  } else {
    return $set.indexOf(value) >= 0;
  }
}
function requiresInParams(requires, parameters, displayedParams) {
  if (requires == null) return true;
  return every(requires, (req, key) => {
    let param = null;
    if (req === "$nonExist") {
      param = findByName(displayedParams, key);
      if (param == null) return true;
    } else if (req === "$exist") {
      param = findByName(displayedParams, key);
      if (param != null) return true;
    }

    param = findByName(parameters, key);
    if (param == null) return false;

    const { value } = param;

    if (req === "$nonEmpty") {
      return value != null && !isEmpty(value);
    } else if (has(req, "$subsetOf")) {
      return $subsetOf(value, req["$subsetOf"]);
    } else if (has(req, "$contain")) {
      return $subsetOf(req["$contain"], value);
    } else if (has(req, "$intersectWith")) {
      return $intersectWith(value, req["$intersectWith"]);
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

function isLoop(param) {
  return param.type === "loop";
}

function isKey(param) {
  return param.type === "key";
}

function getKeysFromArray(value) {
  return value.map((val, index) => index);
}

function getDisplayedFields(params, changedFields, init = false) {
  getComposedParams(params, changedFields, init);

  let displayedParams = [];

  each(params, param => {
    if (requiresInParams(param.requires, params, displayedParams)) {
      let { name, defaultValue } = param;

      if (defaultValue == null) {
        if (isCheckbox(param) || isRadio(param || isSwitch(param))) {
          defaultValue = param.defaultChecked;
        } else if (
          isDate(param) ||
          isTime(param) ||
          isDateTime(param) ||
          isWeek(param) ||
          isMonth(param) ||
          isDateRange(param)
        ) {
          defaultValue = param.defaultPickerValue;
        }
      }

      if (!has(param, "value")) {
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
          param.value = param.value.map(val =>
            moment(val, moment.HTML5_FMT.DATETIME_LOCAL_MS)
          );
        } else if (isLoop(param)) {
          if (init) {
            // Convert Array Value to Object
            param.keys = getKeysFromArray(param.value);
            param.value = Object.assign({}, param.value);

            const keysFieldName = getKeysFieldName(name);
            const keysField = findByName(params, keysFieldName);
            keysField.value = param.keys;
          }
        }
      }

      const hasStyle = has(param, "style");
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
