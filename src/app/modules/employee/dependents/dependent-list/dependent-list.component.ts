import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { Dependent } from 'src/app/models/dependent';
import { DependentService } from 'src/app/services/dependent.service';
import { ConfirmationModel } from 'src/app/shared/components/confirmation/confirmation.model';
import { ConfirmationService } from 'src/app/shared/components/confirmation/confirmation.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { ParamsBuilder } from 'src/app/utilities/params-builder';
import { DependentDialogService } from '../services/dependent-dialog.service';

@Component({
  selector: 'app-dependent-list',
  templateUrl: './dependent-list.component.html',
  styleUrls: ['./dependent-list.component.scss']
})
export class DependentListComponent implements OnInit {

  dependent$!: Observable<Dependent[]>;
  displayedColumns: string[] = ['no', 'relationship', 'name', 'dob', 'phone', 'address', 'action'];
  @Input() employeeId!: number;

  constructor(
    private dependentService: DependentService,
    private loaderService: LoaderService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dependentDialogService: DependentDialogService
  ) { }

  ngOnInit(): void {
    this.getDependents();
  }

  getDependents() {
    const params: HttpParams = ParamsBuilder.build({ employeeId: this.employeeId, limit: 100 });
    this.dependent$ = this.dependentService.list({ params }).pipe(map(res => res.data));
  }

  openDependentForm(dependent?: Dependent) {
    if (!dependent) {
      dependent = { employeeId: this.employeeId } as Dependent;
    }
    this.dependentDialogService.open(dependent).subscribe(_ => this.getDependents());
  }

  async delete(dependentId: number) {
    const confirmation: ConfirmationModel = {
      title: 'DELETE?',
      content: 'Are you sure you want to delete this dependent?'
    };
    const agreed: boolean = await this.confirmationService.confirm(confirmation).toPromise();
    if (agreed) {
      this.loaderService.show();
      this.dependentService.delete(dependentId)
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe(_ => {
          this.getDependents();
          this.messageService.show('Dependent has been deleted successfully.');
        });
    }
  }

}
