import { Component, inject } from '@angular/core';
import { NotificationStore } from '../../../core/services/notification.store';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss',
})
export class ToastContainerComponent {
  readonly store = inject(NotificationStore);

  dismiss(id: string) {
    this.store.dismiss(id);
  }
}
