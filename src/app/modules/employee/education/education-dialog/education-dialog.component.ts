import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { Education } from 'src/app/models/education';
import { ResponseDTO } from 'src/app/models/response-dto';
import { EducationService } from 'src/app/services/education.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { EducationFormService } from '../services/education-form.service';

@Component({
  selector: 'app-education-dialog',
  templateUrl: './education-dialog.component.html',
  styleUrls: ['./education-dialog.component.scss']
})
export class EducationDialogComponent {

  educationForm: FormGroup;

  constructor(
    private educationService: EducationService,
    private educationFormService: EducationFormService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private dialogRef: MatDialogRef<EducationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Education
  ) {
    this.educationForm = this.educationFormService.createForm(this.data);
  }

  submit() {
    this.educationForm.markAllAsTouched();
    if (this.educationForm.invalid) {
      this.messageService.show('Please enter the required fields.');
      return;
    }

    const edcuation: Education = this.educationForm.value;
    const edcuationId: number = this.data?.id;
    edcuationId > 0 ? this.update(edcuationId, edcuation) : this.save(edcuation);
  }

  private save(edcuation: Education) {
    this.loaderService.show();
    this.educationService.save(edcuation)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => this.responseHandler(res, 'Education has been created successfully.'));
  }

  private update(edcuationId: number, edcuation: Education) {
    this.loaderService.show();
    this.educationService.update(edcuationId, edcuation)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => this.responseHandler(res, 'Education has been updated successfully.'));
  }

  private responseHandler(res: ResponseDTO, message: string) {
    this.dialogRef.close();
    this.messageService.show(message);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
