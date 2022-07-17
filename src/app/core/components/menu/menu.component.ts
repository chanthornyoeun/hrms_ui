import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  pages: Array<Page> = [];

  constructor(
    private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.getPages();
  }

  private getPages() {
    this.pageService.getPageByCurrentUser().subscribe(res => {
      this.pages = res.data;
      this.pageService.pages = this.pages;
    });
  }

}
