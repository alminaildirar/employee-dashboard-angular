import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthStore } from '../../../core/services/auth.store';
import { NotificationStore } from '../../../core/services/notification.store';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  private readonly router = inject(Router);
  private readonly toast = inject(NotificationStore);
  readonly auth = inject(AuthStore);

  async logout() {
    this.auth.logout();
    this.toast.show('Çıkış yapıldı', 'success');
    await this.router.navigate(['/login']);
  }
}
