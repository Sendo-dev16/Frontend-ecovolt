import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MenuComponent } from '../../menu/menu.component';
import { DeviceResponse } from '../../models/device.model';
import { DeviceService } from '../../services/device.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-detalle-dispositivo',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MenuComponent
  ],
  templateUrl: './detalle-dispositivo.component.html',
  styleUrl: './detalle-dispositivo.component.css'
})
export class DetalleDispositivoComponent implements OnInit {
  idDevice = 0;
  device?: DeviceResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private deviceService: DeviceService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.idDevice = Number(this.route.snapshot.paramMap.get('id'));
    this.deviceService.getById(this.idDevice).subscribe({
      next: response => this.device = response.data,
      error: () => this.router.navigate(['/dashboard'])
    });
  }

  eliminarDispositivo(): void {
    if (!this.notification.confirm('Retirar dispositivo del sistema?')) {
      return;
    }

    this.deviceService.delete(this.idDevice).subscribe({
      next: response => {
        this.notification.success(response.message, 'Dispositivo retirado');
        this.router.navigate(['/dashboard']);
      },
      error: () => this.notification.error('No se pudo retirar el dispositivo.')
    });
  }
}

