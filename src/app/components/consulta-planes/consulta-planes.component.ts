import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MenuComponent } from '../../menu/menu.component';
import { SubscriptionPlanResponse } from '../../models/subscription-plan.model';
import { TokenService } from '../../security/token.service';
import { NotificationService } from '../../services/notification.service';
import { SubscriptionPlanService } from '../../services/subscription-plan.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-consulta-planes',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    MenuComponent
  ],
  templateUrl: './consulta-planes.component.html',
  styleUrl: './consulta-planes.component.css'
})
export class ConsultaPlanesComponent implements OnInit {
  plans: SubscriptionPlanResponse[] = [];
  planOptions: SubscriptionPlanResponse[] = [];
  selectedPlanId?: number;
  displayedColumns = ['name', 'description', 'price', 'durationDays', 'status', 'actions'];
  isAdmin = false;

  constructor(
    private planService: SubscriptionPlanService,
    private notification: NotificationService,
    private tokenService: TokenService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.tokenService.hasRole('ROLE_ADMIN') || this.tokenService.hasRole('ROLE_MANAGER');
    this.loadPlans();
    this.loadPlanOptions();
  }

  loadPlans(): void {
    this.planService.list().subscribe({
      next: response => this.plans = response.data || [],
      error: () => this.plans = []
    });
  }

  loadPlanOptions(): void {
    this.utilService.plans().subscribe({
      next: response => this.planOptions = response.data || [],
      error: () => this.planOptions = []
    });
  }

  eliminarPlan(plan: SubscriptionPlanResponse): void {
    if (!this.notification.confirm('Desactivar plan? El backend aplicara borrado logico.')) {
      return;
    }

    this.planService.delete(plan.idPlan).subscribe({
      next: response => {
        this.notification.success(response.message, 'Plan desactivado');
        this.loadPlans();
      },
      error: () => this.notification.error('No se pudo desactivar el plan.')
    });
  }
}
