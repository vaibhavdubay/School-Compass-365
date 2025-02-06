import { Injectable, inject } from '@angular/core';
import { StoreService } from 'src/app/core/service/store.service';
import { AdminState } from '../state/reducer';
import { Store } from '@ngrx/store';
import { selectAdminUser, selectClasses, selectDashboard, selectShift, selectStudents, selectTeachers } from '../state/selector';
import { adminActions, classes, studentAction, school, teachersAction, ShiftAction } from '../state/action';
import { filter } from 'rxjs';
import { AdminUser, ShiftDTO, StudentProfileDTO, TeacherProfileDTO } from '@sc-models/core';

@Injectable()
export class AdminService extends StoreService<AdminState> {
  constructor() {
    const store = inject(Store);

    super(store);
  }

  get adminUser$() {
    return this.select(selectAdminUser).pipe(filter((a) => !!a));
  }
  get classes$() {
    this.dispatch(classes.getAll());
    return this.select(selectClasses).pipe(filter((c) => !!c));
  }
  get teachers$() {
    this.dispatch(teachersAction.getAllTeachers());
    return this.select(selectTeachers).pipe(filter((c) => !!c));
  }
  get dashboard$() {
    this.dispatch(school.getDashboard());
    return this.select(selectDashboard).pipe(filter((c) => !!c));
  }
  createTeachersProfile(teacher: TeacherProfileDTO) {
    this.dispatch(teachersAction.createTeacher({ teacher }));
  }

  updateTeachersProfile(id: string, teacher: TeacherProfileDTO) {
    this.dispatch(teachersAction.updateTeacher({ teacher, id }));
  }

  deleteTeachersProfile(id: string) {
    this.dispatch(teachersAction.deleteTeacher({ id }));
  }

  updateAdminUserProfile(adminUser: AdminUser) {
    this.dispatch(adminActions.updateAdmin({ adminUser }));
  }

  //#region  Students Profile
  get students$() {
    this.dispatch(studentAction.getAllStudents());
    return this.select(selectStudents).pipe(filter((c) => !!c));
  }
  createStudentProfile(student: StudentProfileDTO) {
    this.dispatch(studentAction.createStudents({ Students: student }));
  }

  updateStudentProfile(id: string, student: StudentProfileDTO) {
    this.dispatch(studentAction.updateStudents({ id, Students: student }));
  }

  deleteStudentProfile(id: string) {
    this.dispatch(studentAction.deleteStudents({ id }));
  }
  //#endregion
  
  //#region Shift
  get grtShiftList$() {
    this.dispatch(ShiftAction.getAllShift());
    return this.select(selectShift).pipe(filter((s) => !!s));
  }
  createShiftProfile(shift: ShiftDTO) {
    this.dispatch(ShiftAction.createShift({ Shift: shift }));
  }

  updateShiftProfile(id: string, shift: ShiftDTO) {
    this.dispatch(ShiftAction.updateShift({ id, Shift: shift }));
  }

  deleteShiftProfile(id: string) {
    this.dispatch(ShiftAction.deleteShift({ id }));
  }
  //#endregion
}
