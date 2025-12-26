import { Injectable, computed, effect, signal } from '@angular/core';

export type User = {
  id: string;
  fullName: string;
  email: string;
};

const STORAGE_KEY = 'ng-power.auth.user';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function readUserFromStorage(): User | null {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly _user = signal<User | null>(readUserFromStorage());

  readonly user = computed(() => this._user());
  readonly isLoggedIn = computed(() => !!this._user());

  constructor() {
    effect(() => {
      const u = this._user();
      if (!isBrowser()) return;

      if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else localStorage.removeItem(STORAGE_KEY);
    });
  }

  async login(email: string, password: string): Promise<boolean> {
    if (!email.includes('@') || password.length < 4) return false;

    this._user.set({
      id: 'u_1',
      fullName: 'Demo User',
      email,
    });

    return true;
  }

  logout(): void {
    this._user.set(null);
  }
}