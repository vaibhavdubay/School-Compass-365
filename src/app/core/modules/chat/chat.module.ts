import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './component/chat/chat.component';
import { ChatInputComponent } from './component/chat-input/chat-input.component';
import { ChatHeaderComponent } from './component/chat-header/chat-header.component';
import { ChatBodyComponent } from './component/chat-body/chat-body.component';
import { ChatCardComponent } from './component/chat-card/chat-card.component';
import { ChatListComponent } from './component/chat-list/chat-list.component';
import { ChatLayoutComponent } from './component/chat-layout/chat-layout.component';

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
  imports: [CommonModule, ChatRoutingModule],
})
export class ChatModule {}
