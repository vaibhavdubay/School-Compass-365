import { Component, inject } from '@angular/core';
import { ChatStoreService } from '../../chat.service';

@Component({
  selector: 'sc-chat-list',
  standalone: false,

  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
})
export class ChatListComponent {
  private readonly sharedService = inject(ChatStoreService);
  chatsList$ = this.sharedService.chatList$;
}
