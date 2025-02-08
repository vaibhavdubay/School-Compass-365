import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chat } from '@sc-models/core';
import { switchMap, map, catchError, of } from 'rxjs';
import { apiRoutes } from 'src/app/core/constants/api.constants';
import { ApiService } from 'src/app/core/service/http.service';
import { chatsAction } from './action';

@Injectable()
export class ChatStoreEffect {
  private readonly action$ = inject(Actions);
  private readonly apiService = inject(ApiService);
  private readonly store = inject(Store);


  // #region Chats

  getMessageList$ = createEffect(() => {
    return this.action$.pipe(
      ofType(chatsAction.getMessageList),
      switchMap(() =>
        this.apiService.get<Chat[]>(apiRoutes.chat.getList).pipe(
          map((chats) => chatsAction.getMessageListSuccess({ chats })),
          catchError((err) => of(chatsAction.getMessageListFailure({ error: err }))),
        ),
      ),
    );
  });
}
