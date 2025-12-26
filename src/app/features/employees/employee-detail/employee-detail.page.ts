import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Employee } from '../../../core/services/employees.api';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employee-detail.page.html',
  styleUrl: './employee-detail.page.scss',
})
export class EmployeeDetailPage {
  private readonly route = inject(ActivatedRoute);

  readonly employee = computed(
    () => this.route.snapshot.data['employee'] as Employee
  );
}
