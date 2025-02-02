import { AcademicYear, Class } from "./core.model";



export interface SchoolProfile {
  id: string;
  name: string;
  establishedYear: number;
  address1: string;
  address2: string;
  academicYears: AcademicYear[];
  logoUrl: string;
  currentAcademicYear: AcademicYear;
  city: string;
  town: string;
  state: string;
  pincode: number;
  schoolDISECode: string;
  schoolCode: string;
  classes: Class[];
  createdAt: Date;
  updatedAt: Date;
}

