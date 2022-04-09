import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DependentType } from 'src/app/models/dependent-type';
import { DependentTypeService } from 'src/app/services/dependent-type.service';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-dependent-type-form',
  templateUrl: './dependent-type-form.component.html',
  styleUrls: ['./dependent-type-form.component.scss']
})
export class DependentTypeFormComponent implements OnInit {

  dependentTypeForm!: FormGroup;
  private typeId: number;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private dependentTypeService: DependentTypeService,
    private messageService: MessageService
  ) {
    this.buildForm();
    this.typeId = +activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    if (this.typeId) {
      this.dependentTypeService.get(this.typeId)
        .subscribe(res => {
          const leaveType: DependentType = res.data as DependentType;
          this.dependentTypeForm.patchValue(leaveType);
        });
    }
  }

  private buildForm() {
    this.dependentTypeForm = this.fb.group({
      shortDescription: ['', Validators.required],
      isActive: [true, Validators.required],
      description: ''
    });
  }

  submitForm() {
    const dependentType: DependentType = this.dependentTypeForm.value;
    this.typeId ? this.update(this.typeId, dependentType) : this.save(dependentType);
  }

  private save(dependentType: DependentType) {
    this.dependentTypeService.save(dependentType)
      .subscribe(_ => {
        this.messageService.show('Dependent-Type has been created successfully!');
        this.nagivateToPositionList();
      })
  }

  private update(typeId: number, dependentType: DependentType) {
    this.dependentTypeService.update(typeId, dependentType)
      .subscribe(_ => {
        this.messageService.show('Dependent-Type has been updated successfully!');
        this.nagivateToPositionList();
      })
  }

  private nagivateToPositionList() {
    this.route.navigate(['/dependent-types']);
  }

}
