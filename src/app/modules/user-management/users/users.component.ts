import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PaginationHistoryService } from 'src/app/services/pagination-history.service';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({ search: new FormControl() });
  @ViewChild(UserListComponent, { static: true }) userList!: UserListComponent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private paginationHistoryService: PaginationHistoryService
  ) { }

  ngOnInit(): void {
    const paramsObj: any = this.paginationHistoryService.getQueryParams();
    if (paramsObj.search) {
      this.userList.search(paramsObj);
      this.searchForm.setValue(paramsObj, { emitEvent: false });
      this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { search: paramsObj.search } });
    } else {
      const queryParams: string | null = this.activatedRoute.snapshot.queryParamMap.get('search');
      this.searchForm.get('search')?.setValue(queryParams, { emitEvent: false });
      this.userList.search({ search: queryParams });
    }
    this.searchUsers();
  }

  private searchUsers() {
    this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: { search: value.search } });
        this.userList.search(this.searchForm.value);
      });
  }

}
