import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'info' | 'error';

export type Toast = {
  id: string;
  type: ToastType;
  message: string;
};

@Injectable({ providedIn: 'root' })
export class NotificationStore {
  readonly toasts = signal<Toast[]>([]);

  show(message: string, type: ToastType = 'info', ttlMs = 2500) {
    const id = crypto.randomUUID?.() ?? String(Date.now() + Math.random());
    const toast: Toast = { id, type, message };

    this.toasts.update((arr) => [...arr, toast]);

    setTimeout(() => this.dismiss(id), ttlMs);
  }

  dismiss(id: string) {
    this.toasts.update((arr) => arr.filter((t) => t.id !== id));
  }

  clear() {
    this.toasts.set([]);
  }
}
