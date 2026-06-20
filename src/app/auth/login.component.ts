import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../security/auth.service';
import { TokenService } from '../security/token.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isRegisterMode = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {
    this.isRegisterMode = this.route.snapshot.routeConfig?.path === 'registro';

    if (this.tokenService.getToken()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        const data = response.data;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserId(data.idUser);
        this.tokenService.setUserName(data.login);
        this.tokenService.setUserNameComplete(data.fullName);
        this.tokenService.setAuthorities(data.roles || []);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.loading = false;
        this.notification.error('Revisa tu usuario y contrasena.', 'Acceso denegado');
      },
      complete: () => this.loading = false
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.notification.success(response.message, 'Cuenta creada');
        this.isRegisterMode = false;
        this.router.navigate(['/login']);
        this.loginForm.patchValue({
          login: this.registerForm.value.name,
          password: ''
        });
      },
      error: () => {
        this.loading = false;
        this.notification.error('Verifica los datos o intenta con otro correo.', 'No se pudo registrar');
      },
      complete: () => this.loading = false
    });
  }
}
