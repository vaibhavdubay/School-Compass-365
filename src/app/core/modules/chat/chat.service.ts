import { inject, Injectable } from "@angular/core";
import { StoreService } from "../../service/store.service";
import { ChatStoreState } from "./state/reducer";
import { Store } from "@ngrx/store";
import { chatsAction } from "./state/action";
import { selectChatList } from "./state/selector";

@Injectable({
    providedIn: 'root'
})
export class ChatStoreService extends StoreService<ChatStoreState> {
  constructor() {
    const store = inject(Store);

    super(store);
  }
    
    
      get chatList$() {
        this.dispatch(chatsAction.getMessageList());
        return this.select(selectChatList);
      }
    
}