import { Employee } from "./leave-requst";

export interface Attendance {
    id:          number;
    employeeId:  number;
    checkIn:     Date;
    checkOut:    Date;
    description: string;
    createdAt:   Date;
    updatedAt:   Date;
    employee:    Employee;
}
