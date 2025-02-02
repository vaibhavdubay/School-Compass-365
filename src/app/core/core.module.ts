import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { STORE_FEATURES } from '@sc-enums/store';
import { SharedStoreEffect } from './store/effect';
import { SharedStoreReducer } from './store/reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
// materials
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutComponent } from './components/layout/layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ImageHandlerDirective } from './directives/image-handler.directive';

@NgModule({
  declarations: [LoginComponent, LayoutComponent, MenuComponent, ForgetPasswordComponent, CapitalizePipe, ImageHandlerDirective],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    EffectsModule.forFeature([SharedStoreEffect]),
    StoreModule.forFeature(STORE_FEATURES.SHARED, SharedStoreReducer),
  ],
  exports: [LayoutComponent, CapitalizePipe, ImageHandlerDirective],
})
export class CoreModule {}
