import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MenuComponent } from '../../menu/menu.component';
import { DataCatalog } from '../../models/data-catalog.model';
import { UserResponse } from '../../models/user.model';
import { HomeRequest } from '../../models/home.model';
import { HomeService } from '../../services/home.service';
import { NotificationService } from '../../services/notification.service';
import { TokenService } from '../../security/token.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-registro-vivienda',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MenuComponent
  ],
  templateUrl: './registro-vivienda.component.html',
  styleUrl: './registro-vivienda.component.css'
})
export class RegistroViviendaComponent implements OnInit {
  form: FormGroup;
  propertyTypes: DataCatalog[] = [];
  users: UserResponse[] = [];
  isAdmin = false;

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private notification: NotificationService,
    private utilService: UtilService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.form = this.fb.group({
      alias: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      energyTariff: [0.65, [Validators.required, Validators.min(0)]],
      squareMeters: [60, [Validators.required, Validators.min(1)]],
      idPropertyType: [null],
      idUser: [null]
    });
  }

  ngOnInit(): void {
    this.isAdmin = this.tokenService.hasRole('ROLE_ADMIN');
    this.utilService.propertyTypes().subscribe({
      next: response => this.propertyTypes = response.data || [],
      error: () => this.propertyTypes = []
    });

    if (this.isAdmin) {
      this.form.get('idUser')?.setValidators([Validators.required]);
      this.utilService.adminUsers().subscribe({
        next: response => this.users = response.data || [],
        error: () => this.users = []
      });
    }
  }

  registrarVivienda(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const idUser = this.isAdmin
      ? Number(this.form.value.idUser)
      : Number(this.tokenService.getUserId());

    const payload: HomeRequest = {
      alias: this.form.value.alias,
      address: this.form.value.address,
      city: this.form.value.city,
      energyTariff: Number(this.form.value.energyTariff),
      squareMeters: Number(this.form.value.squareMeters),
      idPropertyType: this.form.value.idPropertyType ? Number(this.form.value.idPropertyType) : null,
      idUser
    };

    this.homeService.register(payload).subscribe({
      next: response => {
        this.notification.success(response.message, 'Vivienda registrada');
        this.router.navigate(['/dashboard']);
      },
      error: error => {
        const message = error?.error?.message || 'No se pudo registrar la vivienda.';
        this.notification.error(message);
      }
    });
  }
}
