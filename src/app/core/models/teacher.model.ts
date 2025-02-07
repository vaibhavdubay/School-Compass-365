import { GENDER } from '@sc-enums/gender';
import { AcademicYear } from './core.model';

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
  aadhar_number: string;
  address: string;
  teachersEducation?: TeachersEducation[];
  teachersExperience?: TeachersExperience[];
  city: string;
  town: string;
  state: string;
  pincode: number;
  years_of_experience: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeacherProfileDTO {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender: GENDER;
  address: string;
  town: string;
  city: string;
  state: string;
  pincode: number;
  userName: string;
  aadhar_number: string;
  subjects: string[];
  years_of_experience: number;
  teachersEducation?: TeachersEducation[];
  teachersExperience?: TeachersExperience[];
  image: File | null;
}

export interface TeachersEducation {
  institution: string;
  level_of_education: string;
  field_of_study: string;
  passingYear: string;
  gpa: string;
}

export interface TeachersExperience {
  institute: string;
  startDate: Date;
  endDate: Date;
  currentlyTeaching: boolean;
}
