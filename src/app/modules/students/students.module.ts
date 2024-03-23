import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { STORE_FEATURES } from '@sc-enums/store';
import { StudentReducer } from './state/reducer';
import { StudentEffects } from './state/effect';
import { StudentsService } from './services/students.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    StoreModule.forFeature(STORE_FEATURES.STUDENT, StudentReducer),
    EffectsModule.forFeature([StudentEffects]),
  ],
  providers: [StudentsService],
})
export class StudentsModule {}
