import { Component, input } from '@angular/core';
import { Chat } from '@sc-models/chat';

@Component({
  selector: 'sc-chat',
  standalone: false,

  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  chat = input.required<Chat>();
}
