import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Dependent } from 'src/app/models/dependent';

@Injectable()
export class DependentFormService {

  constructor(private fb: FormBuilder) { }

  createForm(dependent?: Dependent) {
    const dependentForm = this.fb.group({
      id: [null],
      employeeId: [null],
      dependentType: ['', Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      custom:[''],
      dateOfBirth: [''],
      phone: [''],
      address: [''],
      createdAt: [null],
      updatedAt: [null]
    });

    dependent && dependentForm.patchValue(dependent);
    return dependentForm;
  }

}
