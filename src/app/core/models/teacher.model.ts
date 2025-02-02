import { GENDER } from "@sc-enums/gender";
import { AcademicYear } from "./core.model";

export interface TeacherProfile {
  id: string;
  gender: GENDER;
  schoolId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  academicYears: AcademicYear[];
  profileImageUrl: string;
  subjects: string[];
  years_of_experience: number;
  createdAt: Date;
  updatedAt: Date;
}