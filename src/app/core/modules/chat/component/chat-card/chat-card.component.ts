import { Component, input } from '@angular/core';
import { Chat } from '@sc-models/core';

@Component({
  selector: 'sc-chat-card',
  standalone: false,

  templateUrl: './chat-card.component.html',
  styleUrl: './chat-card.component.scss',
})
export class ChatCardComponent {
  chat = input.required<Chat>();
}
