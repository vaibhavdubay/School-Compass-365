import { Component, input } from '@angular/core';
import { Chat } from '@sc-models/chat';

@Component({
  selector: 'sc-chat-body',
  standalone: false,

  templateUrl: './chat-body.component.html',
  styleUrl: './chat-body.component.scss',
})
export class ChatBodyComponent {
  chats = input.required<Chat[]>();
}
