import { Position } from "./position";

export interface Department {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    managerId: number;
    manager: Manager;
    totalPosition: number | null;
    positions: Position[];
}

export interface Manager {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    phone: string;
}
