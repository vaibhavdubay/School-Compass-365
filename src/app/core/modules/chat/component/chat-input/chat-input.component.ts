import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WebSocketService } from 'src/app/core/service/web-socket.service';

@Component({
  selector: 'sc-chat-input',
  standalone: false,

  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
})
export class ChatInputComponent {
  input = new FormControl('');
  service = inject(WebSocketService);

  constructor() {
    this.service.socketEvent('privateMessage').subscribe((chat) => {
      console.log(chat);
    });
  }

  sendMessage() {
    const value = this.input.value;
    this.input.reset();
    this.service
      .emitSocketEvent('privateMessage', {
        to: 'bbf1deb2-0867-4456-bf7a-c7629e613ee3',
        chat: { value },
      })
      .subscribe((res) => {
        console.log(res);
      });
    console.log(value);
  }
}
