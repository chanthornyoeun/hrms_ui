import { HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAction } from 'src/app/enums/dialog-action.enum';
import { Page } from 'src/app/models/page';
import { PageService } from 'src/app/services/page.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ParamsBuilder } from 'src/app/utilities/params-builder';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss']
})
export class PageFormComponent implements OnInit {

  pageForm!: FormGroup;
  types: string[] = ['Dropdown', 'Link'];
  pages: Page[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PageFormComponent>,
    @Inject(MAT_DIALOG_DATA) public page: Page,
    private pageService: PageService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.buildForm(this.page);
    this.getPages();
  }

  private buildForm(page: Page) {
    this.pageForm = this.fb.group({
      id: null,
      name: ['', Validators.required],
      parentId: null,
      url: '',
      icon: '',
      type: ['', Validators.required],
      description: '',
      orderNo: null,
      children: this.fb.array([])
    });

    if (page) {
      this.pageForm.patchValue(page);
    }
  }

  getPages() {
    const params: HttpParams = ParamsBuilder.build({ type: 'Dropdown', limit: 200 });
    this.pageService.list({ params })
      .subscribe(res => this.pages = this.removeSelfFromParentPage(res.data));
  }

  private removeSelfFromParentPage(pages: Page[]) {
    const index: number = pages.findIndex(p => p.id === this.page?.id);
    if (index > -1) {
      pages.splice(index, 1);
    }
    return pages;
  }

  submit() {
    const page: Page = this.pageForm.value;
    page.id ? this.update(page.id, page) : this.save(page);
  }

  update(id: number, page: Page) {
    this.pageService.update(id, page).subscribe(_ => this.saveHandler('Page has been updated successfully.'));
  }

  save(page: Page) {
    this.pageService.save(page).subscribe(_ => this.saveHandler('Page has been created successfully.'));
  }

  saveHandler(message: string) {
    this.messageService.show(message);
    this.closeDialog(DialogAction.SAVE);
  }

  closeDialog(action: DialogAction = DialogAction.CANCEL) {
    this.dialogRef.close(action);
  }

}
