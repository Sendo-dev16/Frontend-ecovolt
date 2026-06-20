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
import { DeviceRequest } from '../../models/device.model';
import { HomeResponse } from '../../models/home.model';
import { RoomResponse } from '../../models/room.model';
import { DeviceService } from '../../services/device.service';
import { NotificationService } from '../../services/notification.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-registro-dispositivo',
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
  templateUrl: './registro-dispositivo.component.html',
  styleUrl: './registro-dispositivo.component.css'
})
export class RegistroDispositivoComponent implements OnInit {
  form: FormGroup;
  homes: HomeResponse[] = [];
  rooms: RoomResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private notification: NotificationService,
    private utilService: UtilService,
    private router: Router
  ) {
    this.form = this.fb.group({
      idHome: [null, Validators.required],
      idRoom: [null, Validators.required],
      name: ['', Validators.required],
      brand: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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
  }

  registrarDispositivo(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: DeviceRequest = {
      name: this.form.value.name,
      brand: this.form.value.brand,
      idRoom: Number(this.form.value.idRoom)
    };

    this.deviceService.register(payload).subscribe({
      next: response => {
        this.notification.success(response.message, 'Dispositivo vinculado');
        this.router.navigate(['/viviendas', Number(this.form.value.idHome)]);
      },
      error: error => {
        const message = error?.error?.message || 'No se pudo vincular el dispositivo.';
        this.notification.error(message);
      }
    });
  }
}
