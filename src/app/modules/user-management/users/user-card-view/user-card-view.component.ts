import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, finalize } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ParamsBuilder } from 'src/app/utilities/params-builder';

@Component({
  selector: 'app-user-card-view',
  templateUrl: './user-card-view.component.html',
  styleUrls: ['./user-card-view.component.scss']
})
export class UserCardViewComponent implements OnInit {

  users: User[] = [];
  offset: number = 0;
  limit: number = 30;
  total: number = 0;
  isLoading: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(params?: HttpParams) {
    this.isLoading = true;
    this.userService.list({ params }).pipe(
      map(res => {
        this.offset = this.offset + this.limit;
        this.total = res.total;
        return res.data;
      }),
      finalize(() => this.isLoading = false)
    ).subscribe(users => {
      this.users.push(...users);
    });
  }

  refresh() {
    const params: HttpParams = ParamsBuilder.build({ limit: this.limit });
    this.users = [];
    this.getUsers(params);
  }

  onScrollDown($event: any) {
    const params: HttpParams = ParamsBuilder.build({ offset: this.offset, limit: this.limit });
    this.getUsers(params);
  }

}
