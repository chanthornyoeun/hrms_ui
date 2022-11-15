import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { LeaveRequestService } from "../../../../services/leave-request.service";
import { LeaveRequst } from "../../../../models/leave-requst";
import { LoaderService } from "../../../../shared/components/loader/loader.service";
import { finalize } from "rxjs/operators";
import { ConfirmationModel } from "../../../../shared/components/confirmation/confirmation.model";
import { MessageService } from "../../../../shared/services/message.service";
import { ConfirmationService } from "../../../../shared/components/confirmation/confirmation.service";
import { CredentialService } from "../../../../core/http/credential.service";
import { ResponsiveService } from 'src/app/services/responsive.service';
import { LeaveStatusEnum } from 'src/app/enums/leave-status.enum';

@Component({
  selector: 'app-leave-request-view',
  templateUrl: './leave-request-view.component.html',
  styleUrls: ['./leave-request-view.component.scss']
})
export class LeaveRequestViewComponent implements OnInit {

  leaveRequestForm!: FormGroup;
  leaveRequest!: LeaveRequst;
  requestId!: number;
  statuses: string[] = [LeaveStatusEnum.APPROVE, LeaveStatusEnum.REJECT, LeaveStatusEnum.CANCEL];
  breadcrumb: string = '';
  LeaveStatus = LeaveStatusEnum;
  private currentEmployeeId: number;
  canApproved: boolean = false;
  isRequestor: boolean = false;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private leaveRequestService: LeaveRequestService,
    private credentialService: CredentialService,
    public responsive: ResponsiveService
  ) {
    this.buildForm();
    this.requestId = this.activatedRoute.snapshot.params['id'];
    this.currentEmployeeId = this.credentialService.getCredential().employeeId;
  }

  ngOnInit(): void {
    this.getLeaveDetails();
  }

  private buildForm() {
    this.leaveRequestForm = this.fb.group({
      reason: '',
      comment: '',
      status: ''
    });
  }

  private getLeaveDetails() {
    this.loaderService.show();
    this.leaveRequestService.get(this.requestId)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(res => {
        this.leaveRequest = res.data;
        this.canApproved = this.currentEmployeeId === this.leaveRequest.reportTo.id;
        this.isRequestor = this.isRequester();
        this.filterStatus();
        if (this.leaveRequest.status === LeaveStatusEnum.PENDING) {
          this.leaveRequestForm.get('status')?.setValue(this.statuses[0]);
        } else {
          this.leaveRequestForm.patchValue(this.leaveRequest);
        }
      });
  }

  private filterStatus() {
    if (this.isRequester() && this.leaveRequest.status === LeaveStatusEnum.PENDING && !this.canApproved) {
      this.statuses.splice(0, 2);
    } else if (this.leaveRequest.status === LeaveStatusEnum.PENDING) {
      this.statuses.pop();
    }
  }

  private isRequester(): boolean {
    return this.leaveRequest?.employeeId === this.currentEmployeeId;
  }

  submit() {
    const status: string = this.leaveRequestForm.get('status')?.value;
    if (status === LeaveStatusEnum.APPROVE) {
      this.approve();
      return;
    }

    if (status === LeaveStatusEnum.REJECT) {
      if (this.leaveRequestForm.get('reason')?.errors) {
        this.messageService.show('Please provide your reason.');
        return;
      }
      this.reject();
      return;
    }

    if (status === LeaveStatusEnum.CANCEL) {
      this.cancel();
      return;
    }
  }

  async cancel() {
    const confirmation: ConfirmationModel = {
      title: 'CANCEL REQUEST?',
      content: 'Are you sure you want ot cancel your leave request?'
    };
    const agreed: boolean = await this.confirmationService.confirm(confirmation).toPromise();
    if (agreed) {
      this.leaveRequestService.cancel(this.requestId, this.leaveRequestForm.value.comment).subscribe(res => {
        this.navigateToList();
        this.messageService.show('Your leave request has been canceled.');
      });
    }
  }

  async approve() {
    const confirmation: ConfirmationModel = {
      title: 'APPROVED REQUEST?',
      content: `Are you sure you want ot approved employee's request?`
    };
    const agreed: boolean = await this.confirmationService.confirm(confirmation).toPromise();
    if (agreed) {
      this.leaveRequestService.approve(this.requestId, this.leaveRequestForm.value.comment).subscribe(res => {
        this.navigateToList();
        this.messageService.show('Employee leave request has been approved.');
      });
    }
  }

  async reject() {
    const confirmation: ConfirmationModel = {
      title: 'REJECT REQUEST?',
      content: 'Are you sure you want ot reject this leave request?'
    };
    const agreed: boolean = await this.confirmationService.confirm(confirmation).toPromise();
    if (agreed) {
      this.leaveRequestService.reject(this.requestId, this.leaveRequestForm.value.comment).subscribe(res => {
        this.navigateToList();
        this.messageService.show('Employee leave request has been rejected.');
      });
    }
  }

  navigateToList() {
    history.back();
  }

}
