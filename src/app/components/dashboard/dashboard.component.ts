import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, forkJoin, map, of } from 'rxjs';
import { MenuComponent } from '../../menu/menu.component';
import { HomeResponse } from '../../models/home.model';
import { HomeService } from '../../services/home.service';
import { SubscriptionPlanService } from '../../services/subscription-plan.service';

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
    private planService: SubscriptionPlanService
  ) { }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;

    forkJoin({
      homes: this.homeService.myHomes().pipe(
        map(response => response.data || []),
        catchError(() => of([]))
      ),
      plans: this.planService.list().pipe(
        map(response => response.data || []),
        catchError(() => of([]))
      )
    }).subscribe(({ homes, plans }) => {
      this.planCount = plans.length;

      if (!homes.length) {
        this.homes = [];
        this.totalDevices = 0;
        this.loading = false;
        return;
      }

      forkJoin(
        homes.map(home =>
          this.homeService.deviceCount(home.idHome).pipe(
            map(response => ({ ...home, deviceCount: response.data || 0 })),
            catchError(() => of({ ...home, deviceCount: 0 }))
          )
        )
      ).subscribe(summary => {
        this.homes = summary;
        this.totalDevices = summary.reduce((total, home) => total + home.deviceCount, 0);
        this.loading = false;
      });
    });
  }
}

