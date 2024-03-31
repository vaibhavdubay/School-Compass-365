import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/core/service/store.service';
import { StudentState } from '../state/reducer';
import { Store } from '@ngrx/store';
import { selectStudentProfile } from '../state/selector';

@Injectable()
export class StudentsService extends StoreService<StudentState> {
  constructor(store: Store) {
    super(store);
  }

  getStudentProfile() {
    return this.select(selectStudentProfile);
  }
}
