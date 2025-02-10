import { inject, Injectable } from '@angular/core';
import { environment } from '@sc-environment';
import { HttpErrorObject } from '@sc-models/core';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { CookieService } from './cookie.service';
import { SafeToastService } from './safe-toast.service';
import { Chat } from '@sc-models/chat';

/**
 * Represents a notification object.
 * @interface NotificationsObject
 */
interface NotificationsObject {
  title: string;
  body: string;
}

/**
 * A mapping of event types to their respective data types.
 * @typedef EventTypes
 * @property {MessageObject} message - Represents a message event.
 * @property {NotificationsObject} notification - Represents a notification event.
 */
type EventTypes = {
  message: Chat;
  privateMessage: Chat;
  notification: NotificationsObject;
};

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private readonly cookieService = inject(CookieService);
  private readonly toasterService = inject(SafeToastService);
  /**
   * The Socket.IO client connection.
   * @private
   */
  private readonly socket: Socket | null =
    typeof document == 'undefined'
      ? null
      : io(environment.apiUrl.replace('/api', ''), {
          transports: ['websocket'],
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
          auth: {
            token: this.cookieService.get('authorization'),
          },
          withCredentials: true,
        });

  /**
   * A Subject used for handling subscriptions and unsubscriptions.
   * @private
   */
  private readonly subscriptions = new Subject<void>();

  /**
   * Creates an instance of the WebSocketService.
   * Initializes socket connection and event listeners.
   */
  constructor() {
    // Event listeners for various socket events

    /**
     * Logs when the socket successfully connects to the server.
     */
    this.socket?.on('connect', () => console.log('Connected to server'));

    /**
     * Logs when the socket reconnects to the server.
     * @param attemptNumber - The reconnection attempt number.
     */
    this.socket?.on('reconnect', (attemptNumber: number) => {
      console.log(`Reconnected! Attempt number: ${attemptNumber}`);
    });

    /**
     * Logs an error when the socket connection fails.
     * @param error - The error details.
     */
    this.socket?.on('connect_error', (error: any) => {
      console.error('Socket connection failed:', error);
    });

    /**
     * Logs when the socket disconnects from the server.
     * Also triggers the subject to complete the observable.
     */
    this.socket?.on('disconnect', () => {
      this.subscriptions.next();
      console.log('Disconnected from server');
    });

    this.socket?.on('exception', (error: HttpErrorObject) => {
      this.toasterService.error(error.message);
    });
  }

  /**
   * Listens to socket events and returns the corresponding data as an observable.
   * @template T - The event type (e.g., 'message', 'notification').
   * @param event - The name of the event to listen for.
   * @returns {Observable<EventTypes[T]>} An observable that emits the event data when received.
   */
  socketEvent<T extends keyof EventTypes>(event: T): Observable<EventTypes[T]> {
    return new Observable<EventTypes[T]>((observer) => {
      // Listen to the event and parse the incoming data as JSON
      this.socket?.on<string>(event, (data: EventTypes[T]) => {
        observer.next((data)); // Parse the data and emit it to the observer
      });

      // Complete the observer when the subject emits (disconnects)
      this.subscriptions.asObservable().subscribe(() => {
        observer.complete();
      });
    });
  }

  /**
   * Emits an event to the server with the provided data.
   * @template T - The event type (e.g., 'message', 'notification').
   * @param event - The name of the event to emit.
   * @param data - The data to send with the event.
   * @returns {Observable<T>} An observable that completes when the data is emitted.
   */
  emitSocketEvent<T extends keyof EventTypes>(event: T, data: any): Observable<EventTypes[T]> {
    return new Observable<EventTypes[T]>((observer) => {
      // Emit the event and send data to the server
      this.socket?.emit(event, data);
      this.socket?.on<string>(event+'Success', (data: EventTypes[T]) => {
        if(data) {
          observer.next(data);
          observer.complete();
          this.socket?.off(event+'Success');
        }
      });
      // Complete the observer after emitting
    });
  }

  /**
   * Disconnects the socket from the server.
   * This is used for manual disconnection of the socket.
   */
  disconnect(): void {
    if (this.socket?.connected) {
      this.socket.disconnect();
    }
  }

  /**
   * Reconnects the socket to the server.
   * This is used to manually reconnect the socket if it was disconnected.
   */
  reconnect(): void {
    if (!this.socket?.connected) {
      this.socket?.connect();
    }
  }
}
