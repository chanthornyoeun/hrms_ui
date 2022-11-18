export interface Position {
    id: number;
    departmentId: number;
    position: string;
    isActive: boolean;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}