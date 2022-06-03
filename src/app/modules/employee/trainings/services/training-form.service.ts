import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Training } from "src/app/models/training";

@Injectable()
export class TrainingFormService {

    constructor(private fb: FormBuilder) { }

    createForm(training?: Training) {
        const trainingForm = this.fb.group({
            id: [null],
            employeeId: [null],
            courseName: ['', Validators.required],
            courseLevel: [null, Validators.required],
            courseOfferBy: [null, Validators.required],
            startDate: ['', Validators.required],
            finishDate: ['', Validators.required],
            description: [''],
            createdAt: [null],
            updatedAt: [null]
          });

          training && trainingForm.patchValue(training);
          return trainingForm;
    }

}
