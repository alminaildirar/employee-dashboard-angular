import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { Employee } from '../../../core/mock/employees.mock';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employee-detail.page.html',
  styleUrl: './employee-detail.page.scss',
})
export class EmployeeDetailPage {
  private readonly route = inject(ActivatedRoute);

  readonly employee = toSignal<Employee | null>(
    this.route.data.pipe(
      map((d) => (d['employee'] as Employee | null) ?? null)
    ),
    { initialValue: null }
  );
}
