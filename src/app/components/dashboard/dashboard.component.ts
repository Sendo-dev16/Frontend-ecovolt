import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// Importaciones de RxJS necesarias para una lógica limpia
import { catchError, forkJoin, map, of, switchMap, finalize } from 'rxjs';

import { MenuComponent } from '../../menu/menu.component';
import { HomeResponse } from '../../models/home.model';
import { HomeService } from '../../services/home.service';
import { SubscriptionPlanService } from '../../services/subscription-plan.service';
import { NotificationService } from '../../services/notification.service';

interface HomeSummary extends HomeResponse {
  deviceCount: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MenuComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  homes: HomeSummary[] = [];
  planCount = 0;
  totalDevices = 0;
  loading = true;

  constructor(
    private homeService: HomeService,
    private planService: SubscriptionPlanService,
    private notification: NotificationService // Inyectado para manejo de errores visuales
  ) { }

  ngOnInit(): void {
    this.loadDashboard();
  }

  /**
   * REGLA DE NEGOCIO: Carga reactiva del Dashboard.
   * Se usa switchMap para evitar suscripciones anidadas y finalize para asegurar
   * que el spinner de carga desaparezca siempre.
   */
  loadDashboard(): void {
  console.log("Iniciando carga del Dashboard...");
  this.loading = true;

  forkJoin({
    homesResponse: this.homeService.myHomes(),
    plansResponse: this.planService.list()
  }).pipe(
    map(result => {
      console.log("Paso 1: Casas y Planes recibidos", result);
      this.planCount = result.plansResponse.data?.length || 0;
      return result.homesResponse.data || [];
    }),
    switchMap((homes: HomeResponse[]) => {
      console.log("Paso 2: Procesando conteo para casas:", homes);
      if (homes.length === 0) return of([]);

      const requests = homes.map(home =>
        this.homeService.deviceCount(home.idHome).pipe(
          map(res => {
            console.log(`Paso 3: Conteo para casa ${home.idHome} es ${res.data}`);
            return { ...home, deviceCount: res.data || 0 };
          }),
          catchError(err => {
            console.error("Error en deviceCount", err);
            return of({ ...home, deviceCount: 0 });
          })
        )
      );
      return forkJoin(requests);
    }),
    finalize(() => {
      console.log("Paso 4: Finalizado. Apagando loading.");
      this.loading = false;
    })
  ).subscribe({
    next: (summary: any[]) => {
      console.log("Paso 5: Datos finales en el componente:", summary);
      this.homes = summary;
      this.totalDevices = summary.reduce((acc, h) => acc + h.deviceCount, 0);
    },
    error: (err) => {
      console.error("Error crítico en el Dashboard:", err);
      this.loading = false;
    }
  });
  }
}