import React, { Component } from "react";
import OpportunitiesTable from "./opportunitiesTable";
import Pagination from "./common/pagination";
import { getOpportunities } from "../services/opportunityService";
import OpportunitySearchForm from "./opportunitySearchForm";
import _ from "lodash";

class Opportunities extends Component {
  state = {
    opportunities: [],
    pgInfo: {
      currentPage: 1,
      totalPages: 0,
      pageSize: 4,
      sortColumn: { path: "title", order: "asc" }
    },
    searchFilter: {
      location: {},
      schedule: {}
    },
    isLoading: false
  };

  async loadData(searchFilter, pgInfo) {
    this.setState({ isLoading: true });
    try {
      const { data: result } = await getOpportunities(searchFilter, pgInfo);
      pgInfo.totalPages = result.pgInfo.totalPages;
      const { opportunities } = result;
      this.setState({ opportunities, searchFilter, pgInfo, isLoading: false });
    } catch (ex) {
      console.log("exception=" + ex);
      this.setState({ isLoading: false });
    }
  }

  async componentDidMount() {
    const { searchFilter, pgInfo } = this.state;
    await this.loadData(searchFilter, pgInfo);
  }

  handlePageChange = async page => {
    const { searchFilter, pgInfo } = this.state;
    const newPgInfo = _.clone(pgInfo);
    newPgInfo.currentPage = page;
    await this.loadData(searchFilter, newPgInfo);
  };

  handleSearch = async newSearchFilter => {
    const { pgInfo } = this.state;
    const newPgInfo = _.clone(pgInfo);
    newPgInfo.currentPage = 1;
    await this.loadData(newSearchFilter, newPgInfo);
  };

  handleSort = async sortColumn => {
    const { searchFilter, pgInfo } = this.state;
    const newPgInfo = _.clone(pgInfo);
    newPgInfo.sortColumn = sortColumn;
    await this.loadData(searchFilter, newPgInfo);
  };

  render() {
    const { pgInfo, searchFilter, opportunities, isLoading } = this.state;
    return (
      <React.Fragment>
        <div className="row ml-2 mb-5">
          <OpportunitySearchForm
            onSearch={this.handleSearch}
            data={searchFilter}
            isLoading={isLoading}
          />
        </div>

        <div className="row">
          {opportunities.length === 0 && (
            <p>There are no Opportunities matching the search criteria.</p>
          )}

          {opportunities.length > 0 && (
            <React.Fragment>
              <OpportunitiesTable
                opportunities={opportunities}
                sortColumn={pgInfo.sortColumn}
                onSort={this.handleSort}
              />
              <Pagination
                totalPages={pgInfo.totalPages}
                currentPage={pgInfo.currentPage}
                onPageChange={this.handlePageChange}
              />
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Opportunities;
