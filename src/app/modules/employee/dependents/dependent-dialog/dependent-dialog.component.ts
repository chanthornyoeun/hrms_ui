import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { Dependent } from 'src/app/models/dependent';
import { ResponseDTO } from 'src/app/models/response-dto';
import { DependentService } from 'src/app/services/dependent.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { DependentFormService } from '../services/dependent-form.service';

@Component({
  selector: 'app-dependent-dialog',
  templateUrl: './dependent-dialog.component.html',
  styleUrls: ['./dependent-dialog.component.scss']
})
export class DependentDialogComponent {

  dependentForm: FormGroup;

  constructor(
    private dependentService: DependentService,
    private dependentFormService: DependentFormService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private dialogRef: MatDialogRef<DependentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Dependent
  ) {
    this.dependentForm = this.dependentFormService.createForm(this.data);
  }

  submit() {
    this.dependentForm.markAllAsTouched();
    if (this.dependentForm.invalid) {
      this.messageService.show('Please enter the required fields.');
      return;
    }

    const dependent: Dependent = this.dependentForm.value;
    const dependentId: number = this.data?.id;
    dependentId > 0 ? this.update(dependentId, dependent) : this.save(dependent);
  }

  private save(dependent: Dependent) {
    this.loaderService.show();
    this.dependentService.save([dependent])
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => this.responseHandler(res, 'Dependent has been created successfully.'));
  }

  private update(dependentId: number, dependent: Dependent) {
    this.loaderService.show();
    this.dependentService.update(dependentId, dependent)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => this.responseHandler(res, 'Dependent has been updated successfully.'));
  }

  private responseHandler(res: ResponseDTO, message: string) {
    this.dialogRef.close();
    this.messageService.show(message);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
