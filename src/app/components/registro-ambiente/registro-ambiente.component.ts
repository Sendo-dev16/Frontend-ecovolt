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
import { HomeResponse } from '../../models/home.model';
import { RoomRequest } from '../../models/room.model';
import { NotificationService } from '../../services/notification.service';
import { RoomService } from '../../services/room.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-registro-ambiente',
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
  templateUrl: './registro-ambiente.component.html',
  styleUrl: './registro-ambiente.component.css'
})
export class RegistroAmbienteComponent implements OnInit {
  form: FormGroup;
  homes: HomeResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
    private roomService: RoomService,
    private utilService: UtilService,
    private router: Router
  ) {
    this.form = this.fb.group({
      idHome: [null, Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.utilService.myHomes().subscribe({
      next: response => this.homes = response.data || [],
      error: () => this.homes = []
    });
  }

  registrarAmbiente(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: RoomRequest = {
      idHome: Number(this.form.value.idHome),
      name: this.form.value.name
    };

    this.roomService.register(payload).subscribe({
      next: response => {
        this.notification.success(response.message, 'Ambiente registrado');
        this.router.navigate(['/viviendas', payload.idHome]);
      },
      error: error => {
        const message = error?.error?.message || 'No se pudo registrar el ambiente.';
        this.notification.error(message);
      }
    });
  }
}
