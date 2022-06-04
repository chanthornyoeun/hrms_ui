import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Experience } from "src/app/models/experience";

@Injectable()
export class ExperienceFormService {

    constructor(private fb: FormBuilder) { }

    createForm(experience?: Experience) {
        const experieceForm = this.fb.group({
            id: [null],
            employeeId: [null],
            position: ['', Validators.required],
            fromDate: [null, Validators.required],
            toDate: [null, Validators.required],
            companyName: ['', Validators.required],
            companyWebsite: [''],
            description: [''],
            createdAt: [null],
            updatedAt: [null]
          });

          experience && experieceForm.patchValue(experience);
          return experieceForm;
    }

}
