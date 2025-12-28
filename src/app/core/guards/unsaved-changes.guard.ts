import { CanDeactivateFn } from '@angular/router';

export type HasUnsavedChanges = {
  hasUnsavedChanges: () => boolean;
};

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (
  cmp
) => {
  if (!cmp?.hasUnsavedChanges?.()) return true;

  // SSR-safe
  if (typeof window === 'undefined') return true;

  return window.confirm('You have unsaved changes. Leave anyway?');
};
