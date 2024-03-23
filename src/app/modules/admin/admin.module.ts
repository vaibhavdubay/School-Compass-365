import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { STORE_FEATURES } from '@sc-enums/store';
import { StoreModule } from '@ngrx/store';
import { AdminReducer } from './state/reducer';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './state/effect';
import { AdminService } from './services/admin.service';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    CommonModule,
    AdminRoutingModule,
    StoreModule.forFeature(STORE_FEATURES.ADMIN, AdminReducer),
    EffectsModule.forFeature([AdminEffects]),
  ],
  providers: [AdminService],
})
export class AdminModule {}
