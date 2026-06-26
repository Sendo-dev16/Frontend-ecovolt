import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { SubscriptionPlanService } from '../../services/subscription-plan.service';
import { SubscriptionPlan } from '../../models/subscription-plan.model';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-planes-detalle',
  standalone: true,
  imports: [CommonModule, MenuComponent, RouterLink, MatIconModule],
  templateUrl: './planes-detalle.component.html',
  styleUrl: './planes-detalle.component.css',
})
export class PlanesDetalle implements OnInit {
  planAux!: Observable<SubscriptionPlan>;

  constructor(
    private planService: SubscriptionPlanService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.planAux = this.planService.verDetalle(id!);
  }
}