import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/models/page';
import { Role } from 'src/app/models/role';
import { FlatNode } from 'src/app/modules/page-management/page-management.component';
import { PagePermissionPayload, PageService } from 'src/app/services/page.service';
import { RoleService } from 'src/app/services/role.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-pagg-configure',
  templateUrl: './pagg-configure.component.html',
  styleUrls: ['./pagg-configure.component.scss']
})
export class PaggConfigureComponent implements OnInit {

  role!: Role;
  private roleId: number;

  constructor(
    private pageService: PageService,
    private roleService: RoleService,
    private activatedRoue: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.roleId = this.activatedRoue.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getPages(this.roleId);
    this.getRoleById(this.roleId);
  }

  private _transformer = (page: Page, level: number) => {
    return {
      expandable: !!page.children && page.children.length > 0,
      level: level,
      ...page
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

  hasChild = (_: number, node: FlatNode) => node.expandable;

  private getRoleById(id: number) {
    this.roleService.get(id).subscribe(res => this.role = res.data);
  }

  private getPages(roleId: number) {
    this.pageService.getPageByRole(roleId).subscribe(res => {
      this.dataSource.data = res.data;
    });
  }

  toggleChild($event: any, page: Page) {
    page.roleChecked = $event.checked;
    console.log($event, page);
  }

  toggleParentPage($event: any, page: Page) {
    page.roleChecked = $event.checked;
    this.getChildren(page.id).forEach(child => child.roleChecked = $event.checked);
  }

  allChecked(parentId: number): boolean {
    return this.getChildren(parentId)?.every(child => child.roleChecked);
  }

  someChecked(page: Page): boolean {
    return this.getChildren(page.id)?.some(child => child.roleChecked) && !this.allChecked(page.id);
  }

  private getChildren(parentId: number): Page[] {
    return this.treeControl.dataNodes?.filter(child => child.parentId === parentId);
  }

  submit() {
    const payload: PagePermissionPayload = {
      roleId: +this.roleId,
      pages: this.treeControl.dataNodes.filter(page => page.roleChecked)?.map(page => page.id)
    };
    this.pageService.applyPage(payload).subscribe(_ => {
      this.messageService.show(`Page permission has been updated for ${this.role.name}.`);
    });
  }

}
