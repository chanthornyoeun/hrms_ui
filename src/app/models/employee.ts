import { Department } from "./department";
import { Position } from "./position";
import { Dependent } from "./dependent";
import { Training } from "./training";
import { Experience } from "./experience";
import { EmergencyContact } from "./emergency-contact";

export interface Employee {
    id: number;
    profilePhoto: string;
    firstName: string;
    lastName: string;
    name: string;
    title: string;
    dateOfBirth: Date;
    gender: string;
    joinedDate: string;
    resignDate?: Date;
    email: string;
    phone: string;
    currentAddress: string;
    physicalAddress: string;
    maritalStatus: string;
    isActive: boolean;
    jobTitle: string;
    createdById?: number;
    updatedById?: number;
    departmentId: number;
    positionId: number;
    createdAt: Date;
    updatedAt: Date;
    position: Position;
    department: Department;
    dependents: Dependent[];
    trainings: Training[];
    experiences: Experience[];
    emergencyContacts: EmergencyContact[];
}
