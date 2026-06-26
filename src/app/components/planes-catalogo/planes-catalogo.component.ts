import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { SubscriptionPlanService } from '../../services/subscription-plan.service';
import { SubscriptionPlan } from '../../models/subscription-plan.model';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-planes-catalogo',
  standalone: true,
  imports: [CommonModule, MenuComponent, RouterLink, MatIconModule, MatProgressSpinner],
  templateUrl: './planes-catalogo.component.html',
  styleUrl: './planes-catalogo.component.css',
})
export class PlanesCatalogo implements OnInit {
  planesAux!: Observable<SubscriptionPlan[]>;

  constructor(private planService: SubscriptionPlanService) {}

  ngOnInit(): void {
    this.planesAux = this.planService.listaPlanes();
  }
}