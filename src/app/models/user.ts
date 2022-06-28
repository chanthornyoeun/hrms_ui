import { Employee } from "./leave-requst";

export interface User {
    id: number;
    username: string;
    email: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    employeeId: number;
    blocked: boolean | number;
    employee: Employee;
    roles: Role[];
}

export interface Role {
    id: number;
    roleName: string;
}