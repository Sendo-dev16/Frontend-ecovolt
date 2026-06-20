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
import { DeviceRequest } from '../../models/device.model';
import { HomeResponse } from '../../models/home.model';
import { RoomResponse } from '../../models/room.model';
import { DeviceService } from '../../services/device.service';
import { NotificationService } from '../../services/notification.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-editar-dispositivo',
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
  templateUrl: './editar-dispositivo.component.html',
  styleUrl: './editar-dispositivo.component.css'
})
export class EditarDispositivoComponent implements OnInit {
  idDevice = 0;
  form: FormGroup;
  homes: HomeResponse[] = [];
  rooms: RoomResponse[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private notification: NotificationService,
    private router: Router,
    private utilService: UtilService
  ) {
    this.form = this.fb.group({
      idHome: [null, Validators.required],
      idRoom: [null, Validators.required],
      name: ['', Validators.required],
      brand: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.idDevice = Number(this.route.snapshot.paramMap.get('id'));

    this.utilService.myHomes().subscribe({
      next: response => this.homes = response.data || [],
      error: () => this.homes = []
    });

    this.form.get('idHome')?.valueChanges.subscribe(homeId => {
      this.rooms = [];
      this.form.patchValue({ idRoom: null }, { emitEvent: false });
      if (homeId) {
        this.utilService.roomsByHome(Number(homeId)).subscribe({
          next: response => this.rooms = response.data || [],
          error: () => this.rooms = []
        });
      }
    });

    this.deviceService.getById(this.idDevice).subscribe({
      next: response => this.form.patchValue({
        name: response.data.name,
        brand: response.data.brand
      }),
      error: () => this.router.navigate(['/dashboard'])
    });
  }

  actualizarDispositivo(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: DeviceRequest = {
      name: this.form.value.name,
      brand: this.form.value.brand,
      idRoom: Number(this.form.value.idRoom)
    };

    this.deviceService.update(this.idDevice, payload).subscribe({
      next: response => {
        this.notification.success(response.message, 'Dispositivo actualizado');
        this.router.navigate(['/dispositivos', this.idDevice]);
      },
      error: error => this.notification.error(error?.error?.message || 'No se pudo actualizar el dispositivo.')
    });
  }
}

