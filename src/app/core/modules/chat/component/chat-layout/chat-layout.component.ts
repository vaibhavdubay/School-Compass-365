import { Component, inject } from '@angular/core';
import { ChatStoreService } from '../../chat.service';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';
import { combineLatest, filter, map } from 'rxjs';

@Component({
  selector: 'sc-chat-layout',
  standalone: false,
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.scss',
})
export class ChatLayoutComponent {
  chatService = inject(ChatStoreService);
  sharedService = inject(SharedStoreService);
  loggedInUser$ = this.sharedService.loggedInUser$;
  chatList$ = this.chatService.chatList$;
  chats$ = this.chatService.chats$;
  selectedUser$ = combineLatest([this.sharedService.loggedInUser$, this.chats$]).pipe(
    filter(([loggedInUser, chats]) => !!loggedInUser && !!chats && chats.length > 0),
    map(([loggedInUser, chats]) => {
      return chats.find((chat) => chat.sender.id === loggedInUser.id)
        ? chats[0].recipient || chats[0].room
        : chats[0].sender;
    }),
  );
}
