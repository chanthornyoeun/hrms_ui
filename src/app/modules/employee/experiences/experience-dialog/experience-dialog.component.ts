import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { Experience } from 'src/app/models/experience';
import { ResponseDTO } from 'src/app/models/response-dto';
import { ExperienceService } from 'src/app/services/experience.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { DirtyPipe } from 'src/app/shared/pipes/dirty.pipe';
import { MessageService } from 'src/app/shared/services/message.service';
import { EducationDialogComponent } from '../../education/education-dialog/education-dialog.component';
import { ExperienceFormService } from '../services/experience-form.service';

@Component({
  selector: 'app-experience-dialog',
  templateUrl: './experience-dialog.component.html',
  styleUrls: ['./experience-dialog.component.scss'],
  providers: [DirtyPipe]
})
export class ExperienceDialogComponent {

  experienceForm: FormGroup;

  constructor(
    private experienceService: ExperienceService,
    private experienceFormService: ExperienceFormService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private dialogRef: MatDialogRef<EducationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Experience
  ) {
    this.experienceForm = this.experienceFormService.createForm(this.data);
  }

  submit() {
    this.experienceForm.markAllAsTouched();
    if (this.experienceForm.invalid) {
      this.messageService.show('Please enter the required fields.');
      return;
    }

    const experience: Experience = this.experienceForm.value;
    const experienceId: number = this.data?.id;
    experienceId > 0 ? this.update(experienceId, experience) : this.save(experience);
  }

  private save(experience: Experience) {
    this.loaderService.show();
    this.experienceService.save([experience])
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => this.responseHandler(res, 'Experiece has been created successfully.'));
  }

  private update(experienceId: number, experience: Experience) {
    this.loaderService.show();
    this.experienceService.update(experienceId, experience)
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
