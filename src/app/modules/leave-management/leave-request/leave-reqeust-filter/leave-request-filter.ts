export interface LeaveRequestFilter {
  fromDate: Date | string | null;
  toDate: Date | string | null;
  leaveTypeId: number | string;
  status: string;
  employeeId: number | string;
}
