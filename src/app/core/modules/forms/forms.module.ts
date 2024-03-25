import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule as F_Module } from '@angular/forms';

import { CheckboxElementComponent } from './checkbox-element/checkbox-element.component';
import { DateElementComponent } from './date-element/date-element.component';
import { SelectElementComponent } from './select-element/select-element.component';
import { TextElementComponent } from './text-element/text-element.component';
import { TextareaElementComponent } from './textarea-element/textarea-element.component';
import { FormElementComponent } from './form-element/form-element.component';
import { RadioElementComponent } from './radio-element/radio-element.component';
import { ButtonElementComponent } from './button-element/button-element.component';
import { LabelElementComponent } from './label-element/label-element.component';
import { FormComponent } from './form.component';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InputFormattingDirective } from './input-formatting.directive';

@NgModule({
  declarations: [
    CheckboxElementComponent,
    DateElementComponent,
    SelectElementComponent,
    TextElementComponent,
    TextareaElementComponent,
    FormComponent,
    FormElementComponent,
    RadioElementComponent,
    ButtonElementComponent,
    LabelElementComponent,
    InputFormattingDirective,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatRippleModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatGridListModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    F_Module,
    ReactiveFormsModule,
  ],
  exports: [FormComponent],
})
export class FormsModule {}
