# Analisis de arquitectura y adaptacion Ecovolt

## Arquitectura del proyecto de referencia

El proyecto ubicado en `E:\CICLO 7\angular-upc-frontend-2026` usa Angular 21 con componentes standalone. No trabaja con `NgModule` de feature; cada pantalla declara sus imports en el decorador `@Component`. La aplicacion se inicia desde `main.ts`, carga `App` y usa `app.config.ts` para proveedores globales como router, HTTP client, Material y el interceptor.

La estructura observada es:

- `app.routes.ts`: tabla central de rutas, con componentes importados directamente.
- `app.settings.ts`: clase estatica con `API_ENDPOINT`.
- `security`: `AuthService`, `TokenService`, DTO de login/JWT y opciones de menu.
- `interceptors`: interceptor HTTP basado en `HTTP_INTERCEPTORS` que agrega `Authorization: Bearer`.
- `models`: clases simples por entidad.
- `services`: servicios inyectables por recurso, con `HttpClient`.
- `menu`: componente standalone compartido.
- `components`: casos de uso nombrados como `registro-*` y `consulta-*`.

El proyecto de referencia mezcla Bootstrap con Angular Material, pero las pantallas nuevas priorizan Angular Material como se solicito. Bootstrap queda como dependencia heredada para respetar la base, aunque la UI Ecovolt no depende de clases Bootstrap.

## Backend real tomado como fuente de verdad

Se leyo el backend sin modificarlo desde `C:\Users\caleb\Documents\Backend-Ecovolt\Ecovolt`. El proceso Java activo escucha en `8090` y el context path es `/ecovolt-api`.

Controladores reales detectados:

- `AuthController`: `/api/v1/auth/login` y `/api/v1/auth/register`.
- `HomeController`: `/api/v1/homes`, `/my-list`, `/{id}`, `/{id}/device-count`, `/admin/all`.
- `RoomController`: `/api/v1/rooms`, `/home/{homeId}`, `/{id}/devices/count`.
- `DeviceController`: `/api/v1/devices`, `/home/{homeId}`, `/room/{roomId}`.
- `SubscriptionPlanController`: `/api/v1/plans`.
- `UtilController`: `/api/v1/utils/catalog/{description}`, `/plans`, `/admin/users`, `/my-homes`, `/home/{homeId}/rooms`.

Todas las respuestas usan el wrapper:

```ts
interface ApiResponse<T> {
  title: string;
  message: string;
  status: string;
  data: T;
}
```

Por eso el frontend no consume arrays u objetos directos; primero lee `response.data`.

## Adaptacion frente a los mockups

Los mockups de Figma se tomaron como guia visual, pero no como contrato funcional. La interfaz se adapto a lo que el backend puede resolver hoy:

- Login y registro de usuario.
- Dashboard con viviendas del usuario logueado.
- Conteo de dispositivos por vivienda.
- Registro de viviendas, ambientes y dispositivos.
- Detalle de vivienda con tablas de ambientes y dispositivos.
- Consulta y alta de planes.
- Edicion y detalle de planes, viviendas, ambientes y dispositivos.
- Vistas administrativas y metricas donde el backend expone endpoints especificos.

No se implementaron pantallas de lecturas energeticas, metas o analiticas historicas porque no existen controladores activos para esos recursos en el backend actual, aunque si existen DTOs/servicios internos en Java.

## Decisiones importantes

- `AppSettings.API_ENDPOINT` apunta a `http://localhost:8090/ecovolt-api/api/v1`.
- El token JWT se guarda en `sessionStorage`, siguiendo el patron del ejemplo.
- `AuthGuard` protege rutas internas.
- `TokenService` guarda `idUser`, `login`, `fullName` y `roles`, que son los campos reales de `JwtResponseDto`.
- `HomeRequest.idPropertyType` es opcional en frontend porque la entidad del backend permite `propertyType` nullable y el catalogo puede no estar sembrado.
- La UI usa Material para toolbar, cards, formularios, tablas, botones e iconos.
- Se conservaron nombres de carpetas tipo `registro-*` y `consulta-*` para respetar la arquitectura del ejemplo.
- Las vistas de edicion consumen los endpoints `PUT`, aunque algunos servicios del backend actual solo persisten una parte del DTO. El frontend no inventa campos fuera del contrato; presenta el formulario completo cuando el DTO lo permite y muestra notas cuando el response no trae todo lo necesario para precargar.

## Cobertura endpoint-pantalla

Ver `ENDPOINT-COVERAGE.md`.

