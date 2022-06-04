import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Education } from 'src/app/models/education';

@Injectable()
export class EducationFormService {

  constructor(private fb: FormBuilder) { }

  createForm(education?: Education) {
      const educationForm = this.fb.group({
          id: [null],
          employeeId: [null],
          major: ['', Validators.required],
          schoolName: [null, Validators.required],
          fromDate: [null, Validators.required],
          toDate: [null, Validators.required],
          description: [''],
          createdAt: [null],
          updatedAt: [null]
        });

        education && educationForm.patchValue(education);
        return educationForm;
  }

}
