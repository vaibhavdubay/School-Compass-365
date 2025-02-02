import { Injectable } from '@angular/core';
import { Content } from '@ngneat/overview';
import { CreateHotToastRef, HotToastService, ObservableMessages, ToastConfig, ToastOptions } from '@ngxpert/hot-toast';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SafeToastService extends HotToastService {
  constructor() {
    super();
  }
  override show<DataType>(
    message?: Content,
    options?: ToastOptions<DataType>,
    skipAttachToParent?: boolean,
  ): CreateHotToastRef<DataType | unknown> {
    return this.browserCheck(() => super.show(message, options, skipAttachToParent)) as CreateHotToastRef<
      DataType | unknown
    >;
  }
  override error<DataType>(message?: Content, options?: ToastOptions<DataType>): CreateHotToastRef<DataType | unknown> {
    if(!options){
      options = {}
    }
    options.icon = 'cancel';
    options.className = 'mat-icon-toast toast-error';
    return this.browserCheck(() => super.show(message, options)) as CreateHotToastRef<DataType | unknown>;
  }
  override success<DataType>(
    message?: Content,
    options?: ToastOptions<DataType>,
  ): CreateHotToastRef<DataType | unknown> {
    return this.browserCheck(() => super.success(message, options)) as CreateHotToastRef<DataType | unknown>;
  }
  override loading<DataType>(
    message?: Content,
    options?: ToastOptions<DataType>,
  ): CreateHotToastRef<DataType | unknown> {
    return this.browserCheck(() => super.loading(message, options)) as CreateHotToastRef<DataType | unknown>;
  }
  override warning<DataType>(
    message?: Content,
    options?: ToastOptions<DataType>,
  ): CreateHotToastRef<DataType | unknown> {
    return this.browserCheck(() => super.warning(message, options)) as CreateHotToastRef<DataType | unknown>;
  }
  override info<DataType>(message?: Content, options?: ToastOptions<DataType>): CreateHotToastRef<DataType | unknown> {
    return this.browserCheck(() => super.info(message, options)) as CreateHotToastRef<DataType | unknown>;
  }
  override observe<T = unknown, DataType = unknown>(
    messages: ObservableMessages<T, DataType>,
  ): (source: Observable<T>) => Observable<T> {
    return this.browserCheck(() => super.observe(messages)) as (source: Observable<T>) => Observable<T>;
  }
  override close(id?: string): void {
    return this.browserCheck(() => super.close(id));
  }

  private browserCheck<T>(callback: () => T): T | undefined {
    if (typeof document !== 'undefined') {
      return callback(); // Call the original show method
    } else {
      console.warn('Toast suppressed: document is undefined.');
      return undefined;
    }
  }
}
