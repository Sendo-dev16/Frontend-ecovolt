import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MenuComponent } from '../../menu/menu.component';
import { DataCatalog } from '../../models/data-catalog.model';
import { HomeRequest } from '../../models/home.model';
import { HomeService } from '../../services/home.service';
import { NotificationService } from '../../services/notification.service';
import { TokenService } from '../../security/token.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-editar-vivienda',
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
  templateUrl: './editar-vivienda.component.html',
  styleUrl: './editar-vivienda.component.css'
})
export class EditarViviendaComponent implements OnInit {
  idHome = 0;
  form: FormGroup;
  propertyTypes: DataCatalog[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private homeService: HomeService,
    private notification: NotificationService,
    private router: Router,
    private tokenService: TokenService,
    private utilService: UtilService
  ) {
    this.form = this.fb.group({
      alias: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      energyTariff: [0.65, [Validators.required, Validators.min(0)]],
      squareMeters: [60, [Validators.required, Validators.min(1)]],
      idPropertyType: [null]
    });
  }

  ngOnInit(): void {
    this.idHome = Number(this.route.snapshot.paramMap.get('id'));
    this.utilService.propertyTypes().subscribe({
      next: response => this.propertyTypes = response.data || [],
      error: () => this.propertyTypes = []
    });

    this.homeService.getById(this.idHome).subscribe({
      next: response => {
        const home = response.data;
        this.form.patchValue({
          alias: home.alias,
          address: home.address,
          city: home.city
        });
      },
      error: () => this.router.navigate(['/dashboard'])
    });
  }

  actualizarVivienda(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: HomeRequest = {
      alias: this.form.value.alias,
      address: this.form.value.address,
      city: this.form.value.city,
      energyTariff: Number(this.form.value.energyTariff),
      squareMeters: Number(this.form.value.squareMeters),
      idPropertyType: this.form.value.idPropertyType ? Number(this.form.value.idPropertyType) : null,
      idUser: Number(this.tokenService.getUserId())
    };

    this.homeService.update(this.idHome, payload).subscribe({
      next: response => {
        this.notification.success(response.message, 'Vivienda actualizada');
        this.router.navigate(['/viviendas', this.idHome]);
      },
      error: error => this.notification.error(error?.error?.message || 'No se pudo actualizar la vivienda.')
    });
  }
}

