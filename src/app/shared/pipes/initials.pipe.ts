import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true,
  pure: true,
})
export class InitialsPipe implements PipeTransform {
  transform(value: string | null | undefined, max = 2): string {
    if (!value) return '';

    const parts = value.trim().split(/\s+/).filter(Boolean);

    const letters = parts.map((p) => p[0]?.toUpperCase()).filter(Boolean);

    return letters.slice(0, max).join('');
  }
}
