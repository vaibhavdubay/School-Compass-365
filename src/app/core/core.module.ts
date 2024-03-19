import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// materials
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StoreModule } from '@ngrx/store';
import { STORE_FEATURES } from '@sc-enums/store';
import { SharedStoreReducer } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { SharedStoreEffect } from './store/effect';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    EffectsModule.forFeature([SharedStoreEffect]),
    StoreModule.forFeature(STORE_FEATURES.SHARED, SharedStoreReducer),
  ],
})
export class CoreModule {}
