import { Component, input } from '@angular/core';
import { Chat } from '@sc-models/chat';
import { User } from '@sc-models/core';

@Component({
  selector: 'sc-chat-list',
  standalone: false,

  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
})
export class ChatListComponent {
  list = input.required<Chat[]>();
  loggedInUser = input.required<User>();
}
