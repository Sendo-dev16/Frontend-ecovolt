import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MenuComponent } from '../../menu/menu.component';
import { SubscriptionPlanResponse } from '../../models/subscription-plan.model';
import { NotificationService } from '../../services/notification.service';
import { SubscriptionPlanService } from '../../services/subscription-plan.service';

@Component({
  selector: 'app-detalle-plan',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MenuComponent
  ],
  templateUrl: './detalle-plan.component.html',
  styleUrl: './detalle-plan.component.css'
})
export class DetallePlanComponent implements OnInit {
  idPlan = 0;
  plan?: SubscriptionPlanResponse;
  activeUsers = 0;
  upgradeOptions: SubscriptionPlanResponse[] = [];
  upgradeForm: FormGroup;
  displayedColumns = ['name', 'price', 'durationDays', 'status'];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notification: NotificationService,
    private planService: SubscriptionPlanService,
    private router: Router
  ) {
    this.upgradeForm = this.fb.group({
      currentLimit: [5, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.idPlan = Number(this.route.snapshot.paramMap.get('id'));
    this.load();
  }

  load(): void {
    this.planService.getById(this.idPlan).subscribe({
      next: response => this.plan = response.data,
      error: () => this.router.navigate(['/planes'])
    });

    this.planService.activeUsers(this.idPlan).subscribe({
      next: response => this.activeUsers = response.data || 0,
      error: () => this.activeUsers = 0
    });
  }

  buscarUpgrades(): void {
    if (this.upgradeForm.invalid) {
      this.upgradeForm.markAllAsTouched();
      return;
    }

    this.planService.upgradeOptions(Number(this.upgradeForm.value.currentLimit)).subscribe({
      next: response => this.upgradeOptions = response.data || [],
      error: () => this.notification.error('No se pudieron cargar opciones de mejora.')
    });
  }

  eliminarPlan(): void {
    if (!this.notification.confirm('Desactivar plan?')) {
      return;
    }

    this.planService.delete(this.idPlan).subscribe({
      next: response => {
        this.notification.success(response.message, 'Plan desactivado');
        this.router.navigate(['/planes']);
      },
      error: () => this.notification.error('No se pudo desactivar el plan.')
    });
  }
}

