import { Component, inject, input } from '@angular/core';
import { Chat } from '@sc-models/chat';
import { filter } from 'rxjs';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';
import { ChatStoreService } from '../../chat.service';
import { User } from '@sc-models/core';

@Component({
  selector: 'sc-chat-card',
  standalone: false,

  templateUrl: './chat-card.component.html',
  styleUrl: './chat-card.component.scss',
})
export class ChatCardComponent {
  sharedStore = inject(SharedStoreService);
  chatService = inject(ChatStoreService);
  chat = input.required<Chat>();
  user$ = this.sharedStore.loggedInUser$.pipe(filter((user) => !!user));

  selectChat(chat: Chat, user: User) {
    this.chatService.selectChat(chat, user.id);
  }
}
