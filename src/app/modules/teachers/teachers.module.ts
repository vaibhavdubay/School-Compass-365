import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersService } from './services/teachers.service';
import { TeachersEffects } from './state/effect';
import { STORE_FEATURES } from '@sc-enums/store';
import { TeachersReducer } from './state/reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    StoreModule.forFeature(STORE_FEATURES.TEACHER, TeachersReducer),
    EffectsModule.forFeature([TeachersEffects]),
  ],
  providers: [TeachersService],
})
export class TeachersModule {}
