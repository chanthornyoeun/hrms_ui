import { Employee } from "./leave-requst";

export interface Education {
    id: number;
    employeeId: number;
    major: string;
    schoolName: string;
    fromDate: Date;
    toDate: Date;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    employee: Employee;
}