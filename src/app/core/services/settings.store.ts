import { Injectable, computed, effect, signal } from '@angular/core';

export type Theme = 'light' | 'dark';
export type Language = 'tr' | 'en';

export type Settings = {
  theme: Theme;
  language: Language;
  compactMode: boolean;
};

const STORAGE_KEY = 'ng-power.settings';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function readFromStorage(): Settings {
  if (!isBrowser()) {
    return { theme: 'light', language: 'tr', compactMode: false };
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { theme: 'light', language: 'tr', compactMode: false };

  try {
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return {
      theme: parsed.theme ?? 'light',
      language: parsed.language ?? 'tr',
      compactMode: parsed.compactMode ?? false,
    };
  } catch {
    return { theme: 'light', language: 'tr', compactMode: false };
  }
}

@Injectable({ providedIn: 'root' })
export class SettingsStore {
  private readonly _settings = signal<Settings>(readFromStorage());

  readonly settings = computed(() => this._settings());
  readonly theme = computed(() => this._settings().theme);

  constructor() {
    effect(() => {
      const s = this._settings();
      if (!isBrowser()) return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    });

    effect(() => {
      const theme = this._settings().theme;
      if (!isBrowser()) return;
      document.documentElement.dataset['theme'] = theme;
    });
  }

  patch(partial: Partial<Settings>) {
    this._settings.update((s) => ({ ...s, ...partial }));
  }
}
