import { Injectable } from '@angular/core';
import { Observable, merge, of, timer } from 'rxjs';
import { map, scan, shareReplay } from 'rxjs/operators';

export type ActivityType = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';

export type ActivityEvent = {
  id: string;
  type: ActivityType;
  message: string;
  at: Date;
};

function id() {
  return crypto.randomUUID?.() ?? String(Date.now() + Math.random());
}

@Injectable({ providedIn: 'root' })
export class ActivityFeedService {
  // Dışarıdan manuel event atmak istersek:
  private manual$: Observable<ActivityEvent> = of();

  // Demo amaçlı “canlı akış”: her 2.5 saniyede bir fake event üretiyo!!
  private generated$ = timer(0, 2500).pipe(
    map((i) => {
      const types: ActivityType[] = ['INFO', 'SUCCESS', 'WARNING', 'ERROR'];
      const t = types[i % types.length];

      const msg =
        t === 'SUCCESS'
          ? 'Background sync completed'
          : t === 'WARNING'
          ? 'Slow network detected'
          : t === 'ERROR'
          ? 'Mock API returned an error (demo)'
          : 'New activity received';

      return {
        id: id(),
        type: t,
        message: msg,
        at: new Date(),
      } satisfies ActivityEvent;
    })
  );

  readonly stream$: Observable<ActivityEvent> = merge(
    this.generated$,
    this.manual$
  ).pipe(shareReplay({ bufferSize: 1, refCount: true }));

  readonly list$: Observable<ActivityEvent[]> = this.stream$.pipe(
    scan((acc, ev) => [ev, ...acc].slice(0, 20), [] as ActivityEvent[]),
    shareReplay({ bufferSize: 1, refCount: true })
  );
}
