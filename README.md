# Frontend Ecovolt

Frontend Angular standalone para el backend Ecovolt levantado en:

```bash
http://localhost:8090/ecovolt-api/api/v1
```

## Ejecutar

```bash
npm install
npm start
```

La aplicacion espera el backend disponible en `localhost:8090` y sirve el frontend en `http://localhost:4200`, que es el origen configurado en el backend.

## Arquitectura

Este proyecto sigue la estructura del frontend de referencia `angular-upc-frontend-2026`:

- `app.settings.ts`: endpoint base centralizado.
- `security`: login, DTO JWT, token service, auth guard.
- `interceptors`: interceptor Bearer para JWT.
- `models`: interfaces alineadas con los DTOs del backend.
- `services`: servicios por recurso REST.
- `menu`: navegacion principal standalone.
- `components`: pantallas por caso de uso.

Mas detalle en `ARCHITECTURE.md`.

## Rutas

- `/login`: inicio de sesion.
- `/registro`: registro de usuario.
- `/dashboard`: resumen de viviendas y dispositivos.
- `/admin/viviendas`: inventario global de viviendas para admin.
- `/viviendas/nueva`: registro de vivienda.
- `/viviendas/:id`: detalle de vivienda.
- `/viviendas/:id/editar`: edicion de vivienda.
- `/ambientes/nuevo`: registro de ambiente.
- `/ambientes/:id`: detalle de ambiente.
- `/ambientes/:id/editar`: edicion de ambiente.
- `/dispositivos/nuevo`: vinculacion de dispositivo.
- `/dispositivos/:id`: detalle de dispositivo.
- `/dispositivos/:id/editar`: edicion de dispositivo.
- `/planes`: consulta de planes.
- `/planes/nuevo`: registro de plan para roles admin/manager.
- `/planes/:id`: detalle, usuarios activos y opciones de mejora.
- `/planes/:id/editar`: edicion de plan.

## Cobertura de endpoints

La cobertura endpoint-pantalla esta documentada en `ENDPOINT-COVERAGE.md`.
