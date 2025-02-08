import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatComponent } from './component/chat/chat.component';
import { ChatInputComponent } from './component/chat-input/chat-input.component';
import { ChatHeaderComponent } from './component/chat-header/chat-header.component';
import { ChatBodyComponent } from './component/chat-body/chat-body.component';
import { ChatCardComponent } from './component/chat-card/chat-card.component';
import { ChatListComponent } from './component/chat-list/chat-list.component';
import { ChatLayoutComponent } from './component/chat-layout/chat-layout.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { STORE_FEATURES } from '@sc-enums/store';
import { ChatStoreEffect } from './state/effects';
import { ChatStoreReducer } from './state/reducer';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '../../core.module';

@NgModule({
  declarations: [
    ChatComponent,
    ChatInputComponent,
    ChatHeaderComponent,
    ChatBodyComponent,
    ChatCardComponent,
    ChatListComponent,
    ChatLayoutComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([ChatStoreEffect]),
    StoreModule.forFeature(STORE_FEATURES.CHAT, ChatStoreReducer),
  ],
})
export class ChatModule {}
