import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Position } from 'src/app/models/position';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-position-dialog',
  templateUrl: './position-dialog.component.html',
  styleUrls: ['./position-dialog.component.scss']
})
export class PositionDialogComponent implements OnInit {

  positionForm: FormGroup;

  constructor(
    private messageService: MessageService,
    private dialogRef: MatDialogRef<PositionDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Position
  ) {
    this.positionForm = this.fb.group({
      id: null,
      position: ['', Validators.required],
      departmentId: null,
      isActive: true,
      description: ''
    });
    this.positionForm.patchValue(this.data);
  }

  ngOnInit(): void {

  }

  submit() {
    this.positionForm.markAllAsTouched();
    if (this.positionForm.invalid) {
      this.messageService.show('Please enter the required fields.');
      return;
    }
    this.closeDialog(this.positionForm.value);
  }

  closeDialog(position?: Position) {
    this.dialogRef.close(position);
  }

}
