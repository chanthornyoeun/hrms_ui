export interface Training {
    id: number;
    employeeId: number;
    courseName: string;
    courseLevel: string;
    courseOfferBy: string;
    description: string;
    startDate: Date;
    finishDate: Date;
    createdAt: Date;
    updatedAt: Date;
}