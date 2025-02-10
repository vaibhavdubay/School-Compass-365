import { Component, input } from '@angular/core';
import { ChatRoom } from '@sc-models/chat';
import { User } from '@sc-models/core';

@Component({
  selector: 'sc-chat-header',
  standalone: false,

  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss',
})
export class ChatHeaderComponent {
  selected = input.required<ChatRoom | User>();
}
