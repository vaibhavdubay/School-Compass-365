import { createAction, props } from '@ngrx/store';
import { StudentProfile } from '@sc-models/student';

export const initStudentState = createAction('[STUDENT] Initiate State', props<{ studentProfile: StudentProfile }>());
