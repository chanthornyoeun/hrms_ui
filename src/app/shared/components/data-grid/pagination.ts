import { HttpParams } from "@angular/common/http";
import { PageEvent } from "@angular/material/paginator";

export abstract class Pagination {

    total!: number;
    readonly defaultPageSize: number = 10;
    protected params: HttpParams;

    constructor() {
        this.params = new HttpParams().set('limit', this.defaultPageSize);
    }

    pageChange($event: PageEvent) {
        const limit = $event.pageSize;
        const offset = $event.pageIndex * limit;
        const params = new HttpParams().set('offset', offset).set('limit', limit);
        this.list(params);
    }

    abstract list(params?: HttpParams): void;

}
