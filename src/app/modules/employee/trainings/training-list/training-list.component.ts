import { Component, Input, OnInit } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { Training } from 'src/app/models/training';
import { TrainingService } from 'src/app/services/training.service';
import { HttpParams } from "@angular/common/http";
import { ParamsBuilder } from "../../../../utilities/params-builder";
import { TrainingDialogService } from "../services/training-dialog.service";
import { ConfirmationModel } from "../../../../shared/components/confirmation/confirmation.model";
import { ConfirmationService } from "../../../../shared/components/confirmation/confirmation.service";
import { MessageService } from "../../../../shared/services/message.service";
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent implements OnInit {

  displayedColumns: string[] = ['no', 'name', 'level', 'offerBy', 'startDate', 'endDate', 'action'];
  training$!: Observable<Training[]>;
  @Input() employeeId!: number;

  constructor(
    private trainingService: TrainingService,
    private loaderService: LoaderService,
    private trainingDialogService: TrainingDialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getTrainings();
  }

  private getTrainings() {
    const params: HttpParams = ParamsBuilder.build({ employeeId: this.employeeId, limit: 100 });
    this.training$ = this.trainingService.list({ params }).pipe(map(res => res.data));
  }

  openTrainingForm(training?: Training) {
    this.trainingDialogService.open(training).subscribe(_ => this.getTrainings());
  }

  async delete(trainingId: number) {
    const confirmation: ConfirmationModel = {
      title: 'DELETE?',
      content: 'Are you sure you want to delete this training?'
    };
    const agreed: boolean = await this.confirmationService.confirm(confirmation).toPromise();
    if (agreed) {
      this.loaderService.show();
      this.trainingService.delete(trainingId)
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe(_ => {
          this.getTrainings();
          this.messageService.show('Training has been deleted successfully.');
        });
    }
  }

}
