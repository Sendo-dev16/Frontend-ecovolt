import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TokenService } from '../security/token.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isLogged = false;
  fullName = '';
  isAdmin = false;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateMenu();
  }

  updateMenu(): void {
    this.isLogged = !!this.tokenService.getToken();
    this.fullName = this.tokenService.getUserNameComplete() || this.tokenService.getUserName() || 'Usuario';
    // Verificamos si es ADMIN para mostrar las opciones de gestión
    this.isAdmin = this.tokenService.hasRole('ROLE_ADMIN');
  }

  onLogOut(): void {
    this.tokenService.logOut();
    this.isLogged = false;
    this.router.navigate(['/login']);
  }
}