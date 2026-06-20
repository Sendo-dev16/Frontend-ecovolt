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
import { HomeResponse } from '../../models/home.model';
import { RoomRequest } from '../../models/room.model';
import { NotificationService } from '../../services/notification.service';
import { RoomService } from '../../services/room.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-editar-ambiente',
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
  templateUrl: './editar-ambiente.component.html',
  styleUrl: './editar-ambiente.component.css'
})
export class EditarAmbienteComponent implements OnInit {
  idRoom = 0;
  form: FormGroup;
  homes: HomeResponse[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private notification: NotificationService,
    private roomService: RoomService,
    private router: Router,
    private utilService: UtilService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      idHome: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.idRoom = Number(this.route.snapshot.paramMap.get('id'));
    this.utilService.myHomes().subscribe({
      next: response => this.homes = response.data || [],
      error: () => this.homes = []
    });
    this.roomService.getById(this.idRoom).subscribe({
      next: response => this.form.patchValue({
        name: response.data.name,
        idHome: response.data.idHome
      }),
      error: () => this.router.navigate(['/dashboard'])
    });
  }

  actualizarAmbiente(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: RoomRequest = {
      name: this.form.value.name,
      idHome: Number(this.form.value.idHome)
    };

    this.roomService.update(this.idRoom, payload).subscribe({
      next: response => {
        this.notification.success(response.message, 'Ambiente actualizado');
        this.router.navigate(['/ambientes', this.idRoom]);
      },
      error: error => this.notification.error(error?.error?.message || 'No se pudo actualizar el ambiente.')
    });
  }
}

