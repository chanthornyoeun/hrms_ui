import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { Page } from 'src/app/core/page';
import { DialogAction } from 'src/app/enums/dialog-action.enum';
import { PageService } from 'src/app/services/page.service';
import { PageFormComponent } from './page-form/page-form.component';

/** Flat node with expandable and level information */
interface FlatNode extends Page {
  level: number;
  expandable: boolean;
}


@Component({
  selector: 'app-page-management',
  templateUrl: './page-management.component.html',
  styleUrls: ['./page-management.component.scss']
})
export class PageManagementComponent implements OnInit {


  ngOnInit(): void {
    this.getPages();
  }

  private _transformer = (node: Page, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      level: level,
      ...node
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private pageService: PageService, private dialog: MatDialog) { }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  private getPages() {
    this.pageService.getPagesAsTree().subscribe(res => {
      this.dataSource.data = res.data;
    });
  }

  openForm(page?: Page) {
    this.dialog.open(PageFormComponent, {
      minWidth: '500px',
      width: '50vw',
      disableClose: true,
      autoFocus: false,
      data: page
    }).afterClosed().subscribe((action: DialogAction) => {
      if (action === DialogAction.SAVE) {
        this.getPages();
      }
    });
  }

}
