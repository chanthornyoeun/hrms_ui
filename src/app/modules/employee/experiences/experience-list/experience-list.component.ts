import { Component, Input, OnInit } from '@angular/core';
import { Experience } from "../../../../models/experience";
import { ConfirmationService } from "../../../../shared/components/confirmation/confirmation.service";
import { MessageService } from "../../../../shared/services/message.service";
import { HttpParams } from "@angular/common/http";
import { ParamsBuilder } from "../../../../utilities/params-builder";
import { ConfirmationModel } from "../../../../shared/components/confirmation/confirmation.model";
import { ExperienceService } from "../../../../services/experience.service";
import { finalize, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { ExperienceDialogService } from '../services/experience-dialog.service';

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience-list.component.html',
  styleUrls: ['./experience-list.component.scss']
})
export class ExperienceListComponent implements OnInit {


  displayedColumns: string[] = ['no', 'company', 'position', 'fromDate', 'toDate', 'description', 'action'];
  experience$!: Observable<Experience[]>;
  @Input() employeeId!: number;

  constructor(
    private experienceService: ExperienceService,
    private experienceDialogService: ExperienceDialogService,
    private loaderService: LoaderService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getExperinces();
  }

  private getExperinces() {
    const params: HttpParams = ParamsBuilder.build({ employeeId: this.employeeId, limit: 100 });
    this.experience$ = this.experienceService.list({ params }).pipe(map(res => res.data));
  }


  openExperienceForm(experience?: Experience) {
    if (!experience) {
      experience = { employeeId: this.employeeId } as Experience;
    }
    this.experienceDialogService.open(experience).subscribe(_ => this.getExperinces());
  }

  async delete(trainingId: number) {
    const confirmation: ConfirmationModel = {
      title: 'DELETE?',
      content: 'Are you sure you want to delete this experience?'
    };
    const agreed: boolean = await this.confirmationService.confirm(confirmation).toPromise();
    if (agreed) {
      this.loaderService.show();
      this.experienceService.delete(trainingId)
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe(_ => {
          this.getExperinces();
          this.messageService.show('Experience has been deleted successfully.');
        });
    }
  }

}
