import { Component, inject } from '@angular/core';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';

@Component({
  selector: 'sc-chat-list',
  standalone: false,
  
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent {

  private readonly sharedService = inject(SharedStoreService);
  chatsList$ = this.sharedService.chatList$
}
