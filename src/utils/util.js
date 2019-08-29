import _ from "lodash";

export function getDaysOfTheWeekPicklist() {
  return [
    { _id: "mo", name: "Mon" },
    { _id: "tu", name: "Tue" },
    { _id: "we", name: "Wed" },
    { _id: "th", name: "Thu" },
    { _id: "fr", name: "Fri" },
    { _id: "sa", name: "Sat" },
    { _id: "su", name: "Sun" }
  ];
}

export function getDaysOfTheWeekIds() {
  return ["mo", "tu", "we", "th", "fr", "sa", "su"];
}

export function isBlank(value) {
  return value === "" || value === null || value === undefined;
}

export function formatDateFields(obj, fieldpaths) {
  _.forEach(fieldpaths, path => {
    _.set(obj, path, formatDate(_.get(obj, path)));
  });
}

export function formatDate(date) {
  if (!date) return date;
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
