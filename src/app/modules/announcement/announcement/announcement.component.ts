import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { HolidayService } from 'src/app/services/holiday.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { FocusDirective } from 'src/app/shared/directives/focus.directive';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent {

  announcementForm: FormGroup;
  file!: File | null;

  @ViewChild('fileRef') fileRef!: ElementRef;
  @ViewChild(FocusDirective) appFocus!: FocusDirective;

  constructor(
    private fb: FormBuilder,
    private holidayService: HolidayService,
    private messageService: MessageService,
    private loaderService: LoaderService
  ) {
    this.announcementForm = this.fb.group({
      text: ['', Validators.required],
      telegram: [true],
      email: [true],
      app: [true],
      fileUpload: []
    }, {
      validators: this.validateAnnouncementChannel()
    });
  }

  announce() {
    this.announcementForm.markAllAsTouched();
    if (this.announcementForm.get('text')?.errors) {
      this.messageService.show('Please input the title.');
      return;
    }

    if (this.announcementForm.errors?.['missedChannel']) {
      this.messageService.show('Please select at least one commnunication channel.');
      return;
    }

    if (!this.file) {
      this.messageService.show('Please select a file.');
      return;
    }

    if (this.announcementForm.invalid) {
      return;
    }

    this.loaderService.show();
    const announcement = this.announcementForm.value;
    announcement.fileUpload = this.file;

    this.holidayService.announcement(this.announcementForm.value)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => {
        this.resetForm();
        this.fileRef.nativeElement.value = null;
        this.file = null;
        this.appFocus.ngAfterViewInit();
        this.messageService.show('The annoucement has been broadcast.')
      });
  }

  private resetForm() {
    this.announcementForm.get('text')?.reset('');
    this.announcementForm.get('fileUpload')?.reset();
  }

  uploadFile($event: any) {
    if ($event.target?.files.length > 0) {
      this.file = $event.target['files'][0];
    }
  }

  validateAnnouncementChannel(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = control.value['telegram'] || control.value['email'] || control.value['app'];
      return isValid ? null : { missedChannel: true };
    }
  }

}
