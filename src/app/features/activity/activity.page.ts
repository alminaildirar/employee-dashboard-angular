import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  ActivityFeedService,
  ActivityType,
} from '../../core/services/activity-feed.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity.page.html',
  styleUrl: './activity.page.scss',
})
export class ActivityPage {
  private readonly feed = inject(ActivityFeedService);

  // Signals (UI state)
  readonly typeFilter = signal<'all' | ActivityType>('all');
  readonly query = signal<string>('');

  // Signal -> Observable
  private readonly typeFilter$ = toObservable(this.typeFilter).pipe(
    startWith('all')
  );
  private readonly query$ = toObservable(this.query).pipe(
    map((v) => v.trim().toLowerCase()),
    startWith('')
  );

  // Observable (feed list)
  private readonly list$ = this.feed.list$;

  // Operators: combineLatest + map ile filtreleme
  private readonly vm$ = combineLatest([
    this.list$,
    this.typeFilter$,
    this.query$,
  ]).pipe(
    map(([list, type, q]) => {
      let filtered = list;

      if (type !== 'all') filtered = filtered.filter((x) => x.type === type);
      if (q)
        filtered = filtered.filter((x) => x.message.toLowerCase().includes(q));

      return {
        total: list.length,
        shown: filtered.length,
        items: filtered,
      };
    })
  );

  // Observable -> Signal
  readonly vm = toSignal(this.vm$, {
    initialValue: { total: 0, shown: 0, items: [] as any[] },
  });

  readonly hasItems = computed(() => this.vm().shown > 0);

  clear() {
    this.typeFilter.set('all');
    this.query.set('');
  }
}
