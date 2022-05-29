import { LeaveType } from "./leave-type";

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    phone: string;
}

export interface LeaveSummary {
    id: number;
    employeeId: number;
    leaveTypeId: number;
    allowanceDay: number;
    availableLeave: number;
    usedLeave: number;
    year: number;
    createdAt: Date;
    updatedAt: Date;
    leaveType: LeaveType;
    employee: Employee;
}