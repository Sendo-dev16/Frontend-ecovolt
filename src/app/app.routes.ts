import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistroViviendaComponent } from './components/registro-vivienda/registro-vivienda.component';
import { DetalleViviendaComponent } from './components/detalle-vivienda/detalle-vivienda.component';
import { RegistroAmbienteComponent } from './components/registro-ambiente/registro-ambiente.component';
import { RegistroDispositivoComponent } from './components/registro-dispositivo/registro-dispositivo.component';
import { ConsultaPlanesComponent } from './components/consulta-planes/consulta-planes.component';
import { RegistroPlanComponent } from './components/registro-plan/registro-plan.component';
import { AdminViviendasComponent } from './components/admin-viviendas/admin-viviendas.component';
import { EditarViviendaComponent } from './components/editar-vivienda/editar-vivienda.component';
import { DetalleAmbienteComponent } from './components/detalle-ambiente/detalle-ambiente.component';
import { EditarAmbienteComponent } from './components/editar-ambiente/editar-ambiente.component';
import { DetalleDispositivoComponent } from './components/detalle-dispositivo/detalle-dispositivo.component';
import { EditarDispositivoComponent } from './components/editar-dispositivo/editar-dispositivo.component';
import { DetallePlanComponent } from './components/detalle-plan/detalle-plan.component';
import { EditarPlanComponent } from './components/editar-plan/editar-plan.component';
import { authGuard } from './security/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'admin/viviendas', component: AdminViviendasComponent, canActivate: [authGuard] },
  { path: 'viviendas/nueva', component: RegistroViviendaComponent, canActivate: [authGuard] },
  { path: 'viviendas/:id/editar', component: EditarViviendaComponent, canActivate: [authGuard] },
  { path: 'viviendas/:id', component: DetalleViviendaComponent, canActivate: [authGuard] },
  { path: 'ambientes/nuevo', component: RegistroAmbienteComponent, canActivate: [authGuard] },
  { path: 'ambientes/:id/editar', component: EditarAmbienteComponent, canActivate: [authGuard] },
  { path: 'ambientes/:id', component: DetalleAmbienteComponent, canActivate: [authGuard] },
  { path: 'dispositivos/nuevo', component: RegistroDispositivoComponent, canActivate: [authGuard] },
  { path: 'dispositivos/:id/editar', component: EditarDispositivoComponent, canActivate: [authGuard] },
  { path: 'dispositivos/:id', component: DetalleDispositivoComponent, canActivate: [authGuard] },
  { path: 'planes', component: ConsultaPlanesComponent, canActivate: [authGuard] },
  { path: 'planes/nuevo', component: RegistroPlanComponent, canActivate: [authGuard] },
  { path: 'planes/:id/editar', component: EditarPlanComponent, canActivate: [authGuard] },
  { path: 'planes/:id', component: DetallePlanComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'dashboard' }
];
