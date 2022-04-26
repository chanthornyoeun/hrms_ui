export interface LeaveRequestFilter {
  fromDate: Date | string;
  toDate: Date | string;
  leaveTypeId: number | string;
  status: string;
}
