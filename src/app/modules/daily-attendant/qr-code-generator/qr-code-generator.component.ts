import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AttendanceService } from 'src/app/services/attendance.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { saveAs } from 'file-saver';
import { finalize } from 'rxjs';
import { DatePipe } from '@angular/common';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-qr-code-generator',
  templateUrl: './qr-code-generator.component.html',
  styleUrls: ['./qr-code-generator.component.scss']
})
export class QrCodeGeneratorComponent implements OnInit {

  qrCodeForm!: FormGroup;
  qrcode?: SafeResourceUrl;
  file?: File;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<QrCodeGeneratorComponent>,
    private attendantService: AttendanceService,
    private fileService: FileService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private domSanitizer: DomSanitizer,
    private datePipe: DatePipe
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.qrCodeForm = this.fb.group({
      logo: null,
      lat: [null, Validators.required],
      lng: [null, Validators.required],
      description: ''
    });
  }

  generate() {
    if (this.qrCodeForm.invalid) {
      this.messageService.show('Please input all required fields.');
      return;
    }

    this.isLoading = true;
    this.attendantService.generateQrCode(this.qrCodeForm.value)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(res => {
        this.file = new File([res], 'qr_code', { type: 'image/png' });
        this.qrcode = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(this.file));
      });
  }

  upload($event: any) {
    this.loaderService.show();
    this.fileService.upload($event.files[0])
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => {
        this.qrCodeForm.get('logo')?.setValue(res.data['url']);
      });
  }

  saveQrCode() {
    if (!this.file) {
      return this.messageService.show('File invalided');
    }
    const dateStr = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    saveAs(this.file, `${dateStr}-qr-code`);
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
