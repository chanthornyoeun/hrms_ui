import { Injectable } from '@angular/core';

export interface PaginationHistory {
  pageIndex: number;
  pageSize: number;
  offset: number;
}

@Injectable()
export class PaginationHistoryService {

  private queryParams: object = {};
  private previousPagination!: PaginationHistory;
  private pagination: PaginationHistory = {
    pageIndex: 0,
    pageSize: 10,
    offset: 0
  };

  setPagination(pagination: PaginationHistory) {
    this.pagination = pagination;
  }

  getPagination(): PaginationHistory {
    return this.pagination;
  }

  setPreviousPagination(pagination: PaginationHistory) {
    this.previousPagination = pagination;
  }

  getPreviousPagination(): PaginationHistory {
    return this.previousPagination;
  }

  updateQueryParams(params: object) {
    this.queryParams = params;
  }

  getQueryParams(): object {
    return this.queryParams;
  }

}
