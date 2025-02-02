import { ACADEMIC_STATUS } from "@sc-enums/academicStatus";
import { BLOOD_GROUP } from "@sc-enums/bloodGroup";
import { GENDER } from "@sc-enums/gender";
import { Class, AcademicYear } from "./core.model";

export interface StudentProfile {
  id: string;
  schoolId: string;
  class: Class;
  classSection: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  pen: string;
  academicStatus: ACADEMIC_STATUS;
  dateOfBirth: Date;
  gender: GENDER;
  bloodGroup: BLOOD_GROUP;
  profileImageUrl: string;
  academicYears: AcademicYear[];
  parentsGuardians: ParentOrGuardian[];
  createdAt: Date;
  updatedAt: Date;
}
export interface ParentOrGuardian {
  id: string;
  name: string;
  gender: GENDER;
  relations: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: Date;
  updatedAt: Date;
}
