export interface WorkingCalendar {
    id: number;
    day: string;
    startTime: string;
    endTime: string;
    isWorking: boolean;
    workingDuration: number;
    departmentId: number;
    createdAt: Date;
    updatedAt: Date;
}
