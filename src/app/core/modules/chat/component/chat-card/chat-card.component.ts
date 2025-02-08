import { Component, inject, input } from '@angular/core';
import { Chat } from '@sc-models/core';
import { filter } from 'rxjs';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';

@Component({
  selector: 'sc-chat-card',
  standalone: false,

  templateUrl: './chat-card.component.html',
  styleUrl: './chat-card.component.scss',
})
export class ChatCardComponent {
  sharedStore = inject(SharedStoreService)
  chat = input.required<Chat>();
  user$ = this.sharedStore.loggedInUser$.pipe(filter((user) => !!user))
}
