import { Component, computed, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  Language,
  Settings,
  SettingsStore,
  Theme,
} from '../../core/services/settings.store';
import { ToggleSwitchComponent } from '../../shared/ui/toggle-switch/toggle-switch.component';

@Component({
  standalone: true,
  imports: [FormsModule, ToggleSwitchComponent],
  templateUrl: './settings.page.html',
  styleUrl: './settings.page.scss',
})
export class SettingsPage {
  private readonly store = inject(SettingsStore);

  // Template-driven form için model (store ile senkron tutacağız)
  model: Settings = { ...this.store.settings() };

  readonly isDark = computed(() => this.store.theme() === 'dark');

  onSubmit(_form: NgForm) {
    this.store.patch(this.model);
  }

  sync() {
    this.store.patch(this.model);
  }

  setTheme(theme: Theme) {
    this.model.theme = theme;
    this.sync();
  }

  setLanguage(lang: Language) {
    this.model.language = lang;
    this.sync();
  }
}
