import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MenuComponent } from '../../menu/menu.component';
import { DeviceResponse } from '../../models/device.model';
import { HomeResponse } from '../../models/home.model';
import { RoomResponse } from '../../models/room.model';
import { DeviceService } from '../../services/device.service';
import { HomeService } from '../../services/home.service';
import { NotificationService } from '../../services/notification.service';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-detalle-vivienda',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MenuComponent
  ],
  templateUrl: './detalle-vivienda.component.html',
  styleUrl: './detalle-vivienda.component.css'
})
export class DetalleViviendaComponent implements OnInit {
  idHome = 0;
  home?: HomeResponse;
  rooms: RoomResponse[] = [];
  devices: DeviceResponse[] = [];
  deviceCount = 0;
  loading = true;
  roomColumns = ['name', 'status', 'actions'];
  deviceColumns = ['name', 'brand', 'roomName', 'status', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService,
    private notification: NotificationService,
    private roomService: RoomService,
    private deviceService: DeviceService
  ) { }

  ngOnInit(): void {
    this.idHome = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDetail();
  }

  loadDetail(): void {
    this.loading = true;

    this.homeService.getById(this.idHome).subscribe({
      next: response => this.home = response.data,
      error: () => this.router.navigate(['/dashboard'])
    });

    this.roomService.byHome(this.idHome).subscribe({
      next: response => this.rooms = response.data || [],
      error: () => this.rooms = []
    });

    this.deviceService.byHome(this.idHome).subscribe({
      next: response => this.devices = response.data || [],
      error: () => this.devices = [],
      complete: () => this.loading = false
    });

    this.homeService.deviceCount(this.idHome).subscribe({
      next: response => this.deviceCount = response.data || 0,
      error: () => this.deviceCount = 0
    });
  }

  eliminarVivienda(): void {
    if (!this.notification.confirm('Eliminar vivienda? Se realizara un borrado logico en el backend.')) {
      return;
    }

    this.homeService.delete(this.idHome).subscribe({
      next: response => {
        this.notification.success(response.message, 'Vivienda eliminada');
        this.router.navigate(['/dashboard']);
      },
      error: () => this.notification.error('No se pudo eliminar la vivienda.')
    });
  }

  eliminarAmbiente(room: RoomResponse): void {
    this.roomService.delete(room.idRoom).subscribe({
      next: response => {
        this.notification.success(response.message, 'Ambiente eliminado');
        this.loadDetail();
      },
      error: () => this.notification.error('No se pudo eliminar el ambiente.')
    });
  }

  eliminarDispositivo(device: DeviceResponse): void {
    this.deviceService.delete(device.idDevice).subscribe({
      next: response => {
        this.notification.success(response.message, 'Dispositivo retirado');
        this.loadDetail();
      },
      error: () => this.notification.error('No se pudo retirar el dispositivo.')
    });
  }
}
