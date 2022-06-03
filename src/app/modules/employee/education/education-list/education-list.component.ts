import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, map, finalize } from 'rxjs';
import { Education } from 'src/app/models/education';
import { EducationService } from 'src/app/services/education.service';
import { ConfirmationModel } from 'src/app/shared/components/confirmation/confirmation.model';
import { ConfirmationService } from 'src/app/shared/components/confirmation/confirmation.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ParamsBuilder } from 'src/app/utilities/params-builder';
import { EducationDialogService } from '../services/education-dialog.service';

@Component({
  selector: 'app-education-list',
  templateUrl: './education-list.component.html',
  styleUrls: ['./education-list.component.scss']
})
export class EducationListComponent implements OnInit {

  displayedColumns: string[] = ['no', 'major', 'school', 'fromDate', 'toDate', 'description', 'action'];
  education$!: Observable<Education[]>;
  @Input() employeeId!: number;

  constructor(
    private educationService: EducationService,
    private loaderService: LoaderService,
    private educationDialogService: EducationDialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getEducations();
  }

  private getEducations() {
    const params: HttpParams = ParamsBuilder.build({ employeeId: this.employeeId, limit: 100 });
    this.education$ = this.educationService.list({ params }).pipe(map(res => res.data));
  }

  openEducationForm(education?: Education) {
    if (!education) {
      education = { employeeId: this.employeeId } as Education;
    }
    this.educationDialogService.open(education).subscribe(_ => this.getEducations());
  }

  async delete(educationId: number) {
    const confirmation: ConfirmationModel = {
      title: 'DELETE?',
      content: 'Are you sure you want to delete this education?'
    };
    const agreed: boolean = await this.confirmationService.confirm(confirmation).toPromise();
    if (agreed) {
      this.loaderService.show();
      this.educationService.delete(educationId)
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe(_ => {
          this.getEducations();
          this.messageService.show('Education has been deleted successfully.');
        });
    }
  }
}
