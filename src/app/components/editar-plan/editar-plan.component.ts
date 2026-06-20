import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MenuComponent } from '../../menu/menu.component';
import { SubscriptionPlanRequest } from '../../models/subscription-plan.model';
import { NotificationService } from '../../services/notification.service';
import { SubscriptionPlanService } from '../../services/subscription-plan.service';

@Component({
  selector: 'app-editar-plan',
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
  templateUrl: './editar-plan.component.html',
  styleUrl: './editar-plan.component.css'
})
export class EditarPlanComponent implements OnInit {
  idPlan = 0;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.idPlan = Number(this.route.snapshot.paramMap.get('id'));
    this.planService.getById(this.idPlan).subscribe({
      next: response => this.form.patchValue(response.data),
      error: () => this.router.navigate(['/planes'])
    });
  }

  actualizarPlan(): void {
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

    this.planService.update(this.idPlan, payload).subscribe({
      next: response => {
        this.notification.success(response.message, 'Plan actualizado');
        this.router.navigate(['/planes', this.idPlan]);
      },
      error: error => this.notification.error(error?.error?.message || 'No se pudo actualizar el plan.')
    });
  }
}

