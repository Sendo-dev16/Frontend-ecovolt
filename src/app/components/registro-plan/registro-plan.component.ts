import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MenuComponent } from '../../menu/menu.component';
import { SubscriptionPlanRequest } from '../../models/subscription-plan.model';
import { NotificationService } from '../../services/notification.service';
import { SubscriptionPlanService } from '../../services/subscription-plan.service';

@Component({
  selector: 'app-registro-plan',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MenuComponent
  ],
  templateUrl: './registro-plan.component.html',
  styleUrl: './registro-plan.component.css'
})
export class RegistroPlanComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
    private planService: SubscriptionPlanService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      durationDays: [30, [Validators.required, Validators.min(1)]]
    });
  }

  registrarPlan(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: SubscriptionPlanRequest = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: Number(this.form.value.price),
      durationDays: Number(this.form.value.durationDays)
    };

    this.planService.register(payload).subscribe({
      next: response => {
        this.notification.success(response.message, 'Plan registrado');
        this.router.navigate(['/planes']);
      },
      error: error => {
        const message = error?.error?.message || 'No se pudo registrar el plan.';
        this.notification.error(message);
      }
    });
  }
}
