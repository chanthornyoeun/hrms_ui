import {LeaveType} from "./leave-type";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  gender: string;
  email: string;
  phone: string;
  profilePhoto: string | null;
}

export interface ReportTo {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
}

export interface LeaveRequst {
  id: number;
  employeeId: number;
  leaveTypeId: number;
  fromDate: string;
  toDate: string;
  day: number;
  reason: string;
  isFullDay: number;
  reportToId: number;
  status: string;
  apporvedById?: number;
  approvedDate?: Date;
  rejectedById?: number;
  rejectedDate?: Date;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
  employee: Employee;
  reportTo: ReportTo;
  leaveType: LeaveType;
  approvedBy?: string;
  rejectedBy?: string;
}
