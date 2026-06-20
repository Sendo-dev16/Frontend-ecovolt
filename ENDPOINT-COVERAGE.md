# Cobertura de endpoints

Base URL:

```text
http://localhost:8090/ecovolt-api/api/v1
```

## Authentication

| Endpoint | Servicio | Pantalla / accion |
|---|---|---|
| `POST /auth/login` | `AuthService.login` | `/login` |
| `POST /auth/register` | `AuthService.register` | `/registro` |

## Homes

| Endpoint | Servicio | Pantalla / accion |
|---|---|---|
| `POST /homes` | `HomeService.register` | `/viviendas/nueva` |
| `PUT /homes/{id}` | `HomeService.update` | `/viviendas/:id/editar` |
| `DELETE /homes/{id}` | `HomeService.delete` | Accion eliminar en `/viviendas/:id` |
| `GET /homes/my-list` | `HomeService.myHomes` | `/dashboard` |
| `GET /homes/{id}` | `HomeService.getById` | `/viviendas/:id` y `/viviendas/:id/editar` |
| `GET /homes/{id}/device-count` | `HomeService.deviceCount` | `/dashboard` y `/viviendas/:id` |
| `GET /homes/admin/all` | `HomeService.allAdmin` | `/admin/viviendas` |

## Rooms

| Endpoint | Servicio | Pantalla / accion |
|---|---|---|
| `POST /rooms` | `RoomService.register` | `/ambientes/nuevo` |
| `PUT /rooms/{id}` | `RoomService.update` | `/ambientes/:id/editar` |
| `DELETE /rooms/{id}` | `RoomService.delete` | Accion eliminar en `/viviendas/:id` |
| `GET /rooms/home/{homeId}` | `RoomService.byHome` | `/viviendas/:id` |
| `GET /rooms/{id}` | `RoomService.getById` | `/ambientes/:id` y `/ambientes/:id/editar` |
| `GET /rooms/{id}/devices/count` | `RoomService.deviceCount` | `/ambientes/:id` |

## Devices

| Endpoint | Servicio | Pantalla / accion |
|---|---|---|
| `POST /devices` | `DeviceService.register` | `/dispositivos/nuevo` |
| `PUT /devices/{id}` | `DeviceService.update` | `/dispositivos/:id/editar` |
| `DELETE /devices/{id}` | `DeviceService.delete` | Accion eliminar en `/viviendas/:id`, `/ambientes/:id` y `/dispositivos/:id` |
| `GET /devices/{id}` | `DeviceService.getById` | `/dispositivos/:id` y `/dispositivos/:id/editar` |
| `GET /devices/home/{homeId}` | `DeviceService.byHome` | `/viviendas/:id` |
| `GET /devices/room/{roomId}` | `DeviceService.byRoom` | `/ambientes/:id` |

## Subscription plans

| Endpoint | Servicio | Pantalla / accion |
|---|---|---|
| `POST /plans` | `SubscriptionPlanService.register` | `/planes/nuevo` |
| `PUT /plans/{id}` | `SubscriptionPlanService.update` | `/planes/:id/editar` |
| `DELETE /plans/{id}` | `SubscriptionPlanService.delete` | Accion desactivar en `/planes` y `/planes/:id` |
| `GET /plans` | `SubscriptionPlanService.list` | `/planes` y `/dashboard` |
| `GET /plans/{id}` | `SubscriptionPlanService.getById` | `/planes/:id` y `/planes/:id/editar` |
| `GET /plans/upgrade-options/{currentLimit}` | `SubscriptionPlanService.upgradeOptions` | Formulario de busqueda en `/planes/:id` |
| `GET /plans/{id}/active-users` | `SubscriptionPlanService.activeUsers` | Metrica en `/planes/:id` |

## Utilities

| Endpoint | Servicio | Pantalla / accion |
|---|---|---|
| `GET /utils/catalog/{description}` | `UtilService.catalog` / `propertyTypes` | Selector de tipo de propiedad en registro/edicion de vivienda |
| `GET /utils/plans` | `UtilService.plans` | Selector de planes en `/planes` |
| `GET /utils/admin/users` | `UtilService.adminUsers` | Selector de propietario admin en `/viviendas/nueva` |
| `GET /utils/my-homes` | `UtilService.myHomes` | Selectores en registro/edicion de ambientes y dispositivos |
| `GET /utils/home/{homeId}/rooms` | `UtilService.roomsByHome` | Selector encadenado de ambientes en registro/edicion de dispositivos |

## Observaciones de integracion

- El backend autentica por `login`, no por email. El formulario de login usa usuario.
- `DeviceResponse` no devuelve `idRoom`, solo `roomName`; por eso la edicion de dispositivo pide seleccionar vivienda y ambiente destino.
- `HomeResponse` no devuelve tarifa, metros ni tipo de propiedad; por eso la edicion de vivienda precarga solo alias, direccion y ciudad, y mantiene valores editables por defecto para el resto del DTO.
- Algunos DTOs de planes no reflejan todos los campos de la entidad (`deviceLimit`, `monthlyPrice`). El frontend consume lo que el backend publica actualmente.
