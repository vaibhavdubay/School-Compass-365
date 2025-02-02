import { GENDER } from "@sc-enums/gender";

export interface AdminUser {
  id: string;
  schoolId: string;
  firstName: string;
  lastName: string;
  gender: GENDER;
  email: string;
  phoneNumber: string;
  profileImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}