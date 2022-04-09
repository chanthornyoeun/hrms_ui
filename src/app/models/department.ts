export interface Department {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    managerId: number;
    manager: Manager;
}

export interface Manager {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    email: string;
    phone: string;
}
