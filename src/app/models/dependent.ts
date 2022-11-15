import { Employee } from "./leave-requst";

export interface Dependent {
    id: number;
    employeeId: number;
    dependentType: string;
    custom?: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phone: string;
    address: string;
    createdAt?: any;
    updatedAt?: any;
    employee: Employee;
}
