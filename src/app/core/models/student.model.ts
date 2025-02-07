import { ACADEMIC_STATUS } from '@sc-enums/academicStatus';
import { BLOOD_GROUP } from '@sc-enums/bloodGroup';
import { GENDER } from '@sc-enums/gender';
import { Class, AcademicYear } from './core.model';

export interface StudentProfile {
  id: string;
  schoolId: string;
  class: Class;
  classId: string;
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
  town: string;
  city: string;
  state: string;
  pincode: number;
  aadhar_number: string;
}
export interface StudentProfileDTO {
  classId?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  phoneNumber: string;
  pen: string;
  dateOfBirth: Date;
  gender: GENDER;
  bloodGroup: string;
  parentsGuardians: Partial<ParentOrGuardian>[];
  image: File | null;
  town: string;
  city: string;
  state: string;
  pincode: number;
  aadhar_number: string;
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
