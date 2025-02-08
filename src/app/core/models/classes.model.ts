import { Class, SchoolProfile } from "./core.model";

export interface ShiftRes {
  id: string;
  school: SchoolProfile;
  name: string;
  startTime: string;
  endTime: string;
  shiftBreak: ShiftBreak[];
  Class:Class[]
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
export interface ShiftDTO {
  name: string;
  startTime: string;
  endTime: string;
  shiftBreak: ShiftBreak[];
  classes:string[]
}
export interface ShiftBreak {
  startTime: string;
  endTime: string;
}
export interface ShiftSchedule {
  shiftName: string;
  shiftStartTime: string;
  shiftEndTime: string;
  breakStartTime: string;
  breakEndTime: string;
  classes: string;
}
