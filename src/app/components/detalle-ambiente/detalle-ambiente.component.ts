import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MenuComponent } from '../../menu/menu.component';
import { DeviceResponse } from '../../models/device.model';
import { RoomResponse } from '../../models/room.model';
import { DeviceService } from '../../services/device.service';
import { NotificationService } from '../../services/notification.service';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-detalle-ambiente',
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
  templateUrl: './detalle-ambiente.component.html',
  styleUrl: './detalle-ambiente.component.css'
})
export class DetalleAmbienteComponent implements OnInit {
  idRoom = 0;
  room?: RoomResponse;
  devices: DeviceResponse[] = [];
  deviceCount = 0;
  displayedColumns = ['name', 'brand', 'status', 'actions'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private deviceService: DeviceService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.idRoom = Number(this.route.snapshot.paramMap.get('id'));
    this.load();
  }

  load(): void {
    this.roomService.getById(this.idRoom).subscribe({
      next: response => this.room = response.data,
      error: () => this.router.navigate(['/dashboard'])
    });

    this.roomService.deviceCount(this.idRoom).subscribe({
      next: response => this.deviceCount = response.data || 0,
      error: () => this.deviceCount = 0
    });

    this.deviceService.byRoom(this.idRoom).subscribe({
      next: response => this.devices = response.data || [],
      error: () => this.devices = []
    });
  }

  eliminarDispositivo(device: DeviceResponse): void {
    if (!this.notification.confirm('Retirar dispositivo del sistema?')) {
      return;
    }

    this.deviceService.delete(device.idDevice).subscribe({
      next: response => {
        this.notification.success(response.message, 'Dispositivo retirado');
        this.load();
      },
      error: () => this.notification.error('No se pudo retirar el dispositivo.')
    });
  }
}

