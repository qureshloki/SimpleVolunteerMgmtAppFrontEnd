import http from "./httpService";
import { formatDateFields } from "../utils/util";
import _ from "lodash";

const apiEndpoint = "/opportunities";

function opportunityUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function getOpportunities(searchfilter, pgInfo) {
  const { location, schedule } = searchfilter;
  const paramsObj = {
    keywords: searchfilter.keywords,
    email: searchfilter.email,
    loc_area: location.area,
    loc_city: location.city,
    sch_fromDate: schedule.fromDate,
    sch_toDate: schedule.toDate,
    sch_maxDurationDays: schedule.maxDurationDays,
    sch_maxHoursPerDay: schedule.maxHoursPerDay,
    pg: pgInfo.currentPage,
    pgSize: pgInfo.pageSize,
    sortBy: pgInfo.sortColumn.path,
    sortOrd: pgInfo.sortColumn.order !== "asc" ? -1 : 1
  };
  const result = await http.get(apiEndpoint, { params: paramsObj });
  processOpportunities(result.data.opportunities);
  return result;
}

export async function getOpportunity(id) {
  const result = await http.get(opportunityUrl(id));
  processOpportunities([result.data]);
  return result;
}

export async function saveOpportunity(opp) {
  let result;
  if (opp._id) {
    const body = { ...opp };
    delete body._id;
    result = await http.put(opportunityUrl(opp._id), body);
  } else {
    result = await http.post(apiEndpoint, opp);
  }
  processOpportunities([result.data]);
  return result;
}

export async function deleteOpportunity(id) {
  const result = await http.delete(opportunityUrl(id));
  processOpportunities([result.data]);
  return result;
}

function processOpportunities(opps) {
  if (!opps) return opps;
  const dateflds = ["schedule.fromDate", "schedule.toDate"];
  _.forEach(opps, opp => {
    formatDateFields(opp, dateflds);
  });
  return opps;
}

export default {
  getOpportunity,
  deleteOpportunity,
  saveOpportunity,
  getOpportunities
};
