import { Component, Inject } from '@angular/core';
import { TrainingService } from "../../../../services/training.service";
import { TrainingFormService } from "../services/training-form.service";
import { MessageService } from "../../../../shared/services/message.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Training } from "../../../../models/training";
import { FormGroup } from "@angular/forms";
import { ResponseDTO } from "../../../../models/response-dto";
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { finalize } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-training-dialog',
  templateUrl: './training-dialog.component.html',
  styleUrls: ['./training-dialog.component.scss']
})
export class TrainingDialogComponent {

  trainingForm: FormGroup;

  constructor(
    private trainingService: TrainingService,
    private trainingFormService: TrainingFormService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private dialogRef: MatDialogRef<TrainingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Training
  ) {
    const employeeId: number = this.activatedRoute.snapshot.params['id'];
    this.trainingForm = this.trainingFormService.createForm(this.data);
    this.trainingForm.get('employeeId')?.setValue(employeeId);
  }

  submit() {
    this.trainingForm.markAllAsTouched();
    if (this.trainingForm.invalid) {
      this.messageService.show('Please enter the required fields.');
      return;
    }

    const training: Training = this.trainingForm.value;
    const trainingId: number = this.data?.id;
    trainingId > 0 ? this.update(trainingId, training) : this.save(training);
  }

  private save(training: Training) {
    this.loaderService.show();
    this.trainingService.save(training)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => this.responseHandler(res, 'Training has been created successfully.'));
  }

  private update(trainingId: number, training: Training) {
    this.loaderService.show();
    this.trainingService.update(trainingId, training)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => this.responseHandler(res, 'Training has been updated successfully.'));
  }

  private responseHandler(res: ResponseDTO, message: string) {
    this.dialogRef.close();
    this.messageService.show(message);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
