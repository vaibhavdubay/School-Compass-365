import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { STORE_FEATURES } from '@sc-enums/store';
import { StoreModule } from '@ngrx/store';
import { AdminReducer } from './state/reducer';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './state/effect';

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(STORE_FEATURES.ADMIN, AdminReducer),
    EffectsModule.forFeature([AdminEffects]),
  ],
  providers: [],
})
export class AdminModule {}
