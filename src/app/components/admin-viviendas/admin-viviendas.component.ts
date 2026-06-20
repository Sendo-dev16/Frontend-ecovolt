import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MenuComponent } from '../../menu/menu.component';
import { HomeResponse } from '../../models/home.model';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-admin-viviendas',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MenuComponent
  ],
  templateUrl: './admin-viviendas.component.html',
  styleUrl: './admin-viviendas.component.css'
})
export class AdminViviendasComponent implements OnInit {
  homes: HomeResponse[] = [];
  displayedColumns = ['alias', 'address', 'city', 'ownerName', 'actions'];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.allAdmin().subscribe({
      next: response => this.homes = response.data || [],
      error: () => this.homes = []
    });
  }
}

