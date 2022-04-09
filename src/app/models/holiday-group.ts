import { Holiday } from "./holiday";

export interface HolidayGroup {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    holidays: Holiday[];
}
