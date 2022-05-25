import { HttpParams } from "@angular/common/http";
import { finalize } from "rxjs";
import { PaginationHistory, PaginationHistoryService } from "src/app/services/pagination-history.service";
import { ParamsBuilder } from "src/app/utilities/params-builder";
import { LoaderService } from "../loader/loader.service";
import { DataGridComponent } from "./data-grid.component";

export abstract class Pagination<T> {

    total!: number;
    readonly defaultPageSize: number = 10;
    abstract grid: DataGridComponent;
    pagination: PaginationHistory = {
        pageIndex: 0,
        pageSize: 10,
        offset: 0
    };
    data: T[] = [];

    constructor(
        protected apiService: any,
        protected loaderService: LoaderService,
        protected paginationHistoryService: PaginationHistoryService
    ) {
        this.pagination = paginationHistoryService.getPagination();
        this.list(this.pagination, ParamsBuilder.build(paginationHistoryService.getQueryParams()));
    }

    pageChange($event: any) {
        this.pagination = $event;
        this.paginationHistoryService.setPagination(this.pagination);
        this.list(this.pagination, ParamsBuilder.build(this.paginationHistoryService.getQueryParams()));
    }

    list(pagination: PaginationHistory, params: HttpParams = new HttpParams()): void {
        params = params.set('offset', pagination.offset).set('limit', pagination.pageSize);
        this.loaderService.show();
        this.apiService.list({ params }).pipe(
            finalize(() => this.loaderService.hide())
        ).subscribe((res: any) => {
            this.data = res.data;
            this.total = res.total;
            this.grid.updatePagination(this.pagination);
        });
    };

}
