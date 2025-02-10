import { Component, inject, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatStoreService } from '../../chat.service';
import { User } from '@sc-models/core';
import { ChatRoom } from '@sc-models/chat';

@Component({
  selector: 'sc-chat-input',
  standalone: false,

  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
})
export class ChatInputComponent {
  loggedInUser = input.required<User>();
  recipient = input.required<ChatRoom | User>();
  input = new FormControl('');
  service = inject(ChatStoreService);

  sendMessage() {
    const value = this.input.value;
    if (!value) return;
    this.input.reset();
    this.service.sendChatMessage({
      id: `temp-${Date.now()}`,
      content: value,
      sender: this.loggedInUser(),
      isRead: false,
      status: 'sending',
      ...('roomType' in this.recipient()
        ? { room: this.recipient() as ChatRoom }
        : { recipient: this.recipient() as User }),
    });
  }
}
