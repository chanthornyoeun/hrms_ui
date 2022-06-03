import { DependentType } from "./dependent-type";
import { Employee } from "./leave-requst";

export interface Dependent {
    id: number;
    employeeId: number;
    dependentTypeId: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phone: string;
    address: string;
    createdAt?: any;
    updatedAt?: any;
    employee: Employee;
    dependentType: DependentType;
}
