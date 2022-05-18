import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Position } from 'src/app/models/position';
import { PositionService } from 'src/app/services/position.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { LoaderService } from "../../../shared/components/loader/loader.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss']
})
export class PositionFormComponent implements OnInit {

  positionForm!: FormGroup;
  private positionId: number;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private positionService: PositionService,
    private messageService: MessageService,
    private loaderService: LoaderService
  ) {
    this.buildForm();
    this.positionId = +activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    if (this.positionId) {
      this.loaderService.show();
      this.positionService.get(this.positionId)
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe(res => {
          const position: Position = res.data as Position;
          this.positionForm.patchValue(position);
        });
    }
  }

  private buildForm() {
    this.positionForm = this.fb.group({
      position: ['', Validators.required],
      isActive: [true, Validators.required],
      description: ''
    });
  }

  submitForm() {
    const position: Position = this.positionForm.value;
    this.positionId ? this.update(this.positionId, position) : this.save(position);
  }

  private save(position: Position) {
    this.positionService.save(position)
      .subscribe(_ => {
        this.messageService.show('Position has been created successfully!');
        this.navigateToPositionList();
      })
  }

  private update(positionId: number, position: Position) {
    this.positionService.update(positionId, position)
      .subscribe(_ => {
        this.messageService.show('Position has been updated successfully!');
        this.navigateToPositionList();
      })
  }

  private navigateToPositionList() {
    this.route.navigate(['/positions']);
  }

}
