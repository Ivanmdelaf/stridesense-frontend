# StrideSense — Frontend

> **Trabajo de Fin de Máster**
> Aplicación web de monitorización del rendimiento deportivo y predicción de riesgo de lesión mediante inteligencia artificial.

---

## Tabla de contenidos

1. [Descripción general](#1-descripción-general)
2. [Características principales](#2-características-principales)
3. [Arquitectura del sistema](#3-arquitectura-del-sistema)
4. [Tecnologías utilizadas](#4-tecnologías-utilizadas)
5. [Requisitos previos](#5-requisitos-previos)
6. [Instalación](#6-instalación)
7. [Configuración](#7-configuración)
8. [Ejecución](#8-ejecución)
9. [Estructura del repositorio](#9-estructura-del-repositorio)
10. [Uso](#10-uso)
11. [Metodología del TFM](#11-metodología-del-tfm)
12. [Resultados principales](#12-resultados-principales)
13. [Limitaciones](#13-limitaciones)
14. [Líneas futuras de trabajo](#14-líneas-futuras-de-trabajo)
15. [Conclusiones](#15-conclusiones)
16. [Autor](#16-autor)
17. [Licencia](#17-licencia)

---

## 1. Descripción general

**StrideSense** es una aplicación web *full-stack* orientada a deportistas y entrenadores que permite registrar sesiones de entrenamiento y obtener una evaluación continua del riesgo de lesión. El módulo frontend, desarrollado con **Angular 20**, constituye la capa de presentación del sistema y se comunica con una API REST implementada en NestJS.

### Problema que aborda

El sobreentrenamiento y la falta de control de la carga deportiva son causas recurrentes de lesiones en deportistas amateurs y profesionales. Actualmente, la mayoría de las aplicaciones deportivas ofrecen estadísticas descriptivas (kilómetros recorridos, frecuencia cardíaca media) pero **no proporcionan una estimación proactiva del riesgo de lesión** basada en el historial completo del usuario.

StrideSense aborda esta brecha combinando:

- Indicadores basados en reglas clínicas (frecuencia semanal, volumen, variedad de deporte, patrón de descanso).
- Un modelo de red neuronal ligero implementado con **TensorFlow.js** que aprende patrones de sobreentrenamiento a partir de métricas de sesión en bruto.

### Contexto académico del TFM

Este proyecto se enmarca en el Trabajo de Fin de Máster de Máster en desarrollo con IA de BigSchool. El objetivo académico es demostrar la viabilidad de integrar técnicas de aprendizaje automático en aplicaciones web de salud deportiva, aplicando principios de arquitectura limpia (*Clean Architecture*) y buenas prácticas de ingeniería del software.

---

## 2. Características principales

| Funcionalidad | Descripción |
|---|---|
| **Autenticación JWT** | Registro e inicio de sesión con tokens almacenados en `localStorage` e inyectados automáticamente en cada petición HTTP. |
| **Gestión de sesiones** | CRUD completo de entrenamientos: deporte, duración, distancia, frecuencia cardíaca y cadencia. |
| **Dashboard de métricas** | Resumen visual de carga semanal (en horas y minutos) y cadencia media. |
| **Evaluación de riesgo** | Puntuación global de riesgo calculada a partir de 4 factores clínicos con visualización mediante gráficos *donut* SVG. |
| **Predicción ML** | Probabilidad de lesión generada por un modelo de red neuronal (TensorFlow.js) a partir de 5 métricas de entrenamiento en bruto. |
| **Internacionalización** | Interfaz completamente en español. |
| **Diseño responsivo** | Interfaz adaptada para dispositivos móviles y escritorio. |
| **Leyendas explicativas** | Paneles desplegables que explican al usuario final el significado de cada indicador de riesgo. |

---

## 3. Arquitectura del sistema

### Visión global

El sistema se compone de tres capas principales siguiendo los principios de **Clean Architecture** (Uncle Bob):

```
┌──────────────────────────────────────────────────────┐
│                  PRESENTATION LAYER                  │
│  Angular Components · NGXS State · Route Guards      │
├──────────────────────────────────────────────────────┤
│                    DOMAIN LAYER                      │
│  Entities · Repository Interfaces · Use Cases        │
├──────────────────────────────────────────────────────┤
│                     DATA LAYER                       │
│  Repository Implementations · HTTP Datasources       │
└──────────────────────────────────────────────────────┘
         │                            ▲
         ▼  HTTP/REST (JWT Bearer)    │
┌──────────────────────────────────────────────────────┐
│              BACKEND — NestJS API                    │
│  Auth · Sessions · Risk (TensorFlow.js)              │
└──────────────────────────────────────────────────────┘
```

### Flujo de datos

```
Usuario
  │
  ▼
Component  ──dispatch──▶  NGXS Action
                              │
                              ▼
                         Use Case
                              │
                              ▼
                       Repository (interface)
                              │
                              ▼
                    Repository Implementation
                              │
                              ▼
                         Datasource (HttpClient)
                              │
                    Authorization Interceptor añade
                    "Bearer <token>" al header
                              │
                              ▼
                         REST API (NestJS)
```

### Estructura de módulos Angular

```
app/
 ├── core/           → Guards, Interceptors, TokenStorageService
 ├── domain/         → Entidades, interfaces de repositorio, casos de uso
 ├── data/           → Implementaciones de repositorio y datasources HTTP
 └── presentation/
      ├── modules/
      │    ├── auth/         → Login, Register
      │    ├── dashboard/    → Pantalla principal
      │    ├── sessions/     → Listado, detalle, formulario, edición
      │    ├── risk/         → Evaluación de riesgo
      │    └── profile/      → Perfil de usuario
      └── state/             → NGXS: UserState, SessionsState, RiskState
```

---

## 4. Tecnologías utilizadas

### Frontend

| Tecnología | Versión | Uso |
|---|---|---|
| Angular | 20.2.x | Framework principal |
| TypeScript | 5.9.x | Lenguaje de desarrollo |
| NGXS | 20.1.x | Gestión de estado global |
| RxJS | 7.8.x | Programación reactiva |
| Zod | 4.x | Validación de variables de entorno |
| SCSS | — | Estilos con BEM |
| Vitest | 4.x | Framework de tests unitarios |

### Infraestructura

| Tecnología | Uso |
|---|---|
| Docker + Docker Compose | Contenerización y orquestación |
| Nginx (alpine) | Servidor web en producción + proxy inverso a la API |
| Node.js 20 (alpine) | Build stage en Docker |

---

## 5. Requisitos previos

| Herramienta | Versión mínima |
|---|---|
| Node.js | 20.x |
| npm | 10.x |
| Angular CLI | 20.x |
| Docker | 24.x *(opcional, para ejecución con contenedores)* |
| Docker Compose | 2.x *(opcional)* |

Verificar instalaciones:

```bash
node --version
npm --version
ng version
docker --version
```

---

## 6. Instalación

### Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd stridesense-frontend
```

### Instalar dependencias

```bash
npm install --legacy-peer-deps
```

> El flag `--legacy-peer-deps` es necesario debido a la compatibilidad entre Angular 20 y algunos plugins de build.

---

## 7. Configuración

### Variables de entorno

Copiar el fichero de ejemplo y ajustar los valores:

```bash
cp .env.example .env
```

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `API_URL` | URL base de la API REST del backend | `http://localhost:3000` |
| `APP_NAME` | Nombre de la aplicación | `StrideSense` |
| `APP_VERSION` | Versión de la aplicación | `1.0.0-dev` |

### Ficheros de entorno Angular

| Fichero | Entorno |
|---|---|
| `src/environments/environment.development.ts` | Desarrollo local |
| `src/environments/environment.ts` | Producción |

Ejemplo de `environment.development.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  appName: 'StrideSense (Dev)',
  appVersion: '1.0.0-dev',
};
```

> **Nota de seguridad:** No incluir credenciales, claves privadas ni secrets en los ficheros de entorno versionados. Utilizar variables de entorno del sistema o secretos en CI/CD para producción.

---

## 8. Ejecución

### Desarrollo local

```bash
# Iniciar servidor de desarrollo con hot-reload
npm start
# o bien
ng serve
```

La aplicación estará disponible en [http://localhost:4200](http://localhost:4200).

Para apuntar a un backend en local, asegurarse de que el backend NestJS está corriendo en el puerto `3000` (o ajustar `environment.development.ts`).

### Con Docker Compose (stack completo)

Desde la raíz del proyecto monorepo (donde se encuentre el `docker-compose.yml`):

```bash
docker compose up --build
```

| Servicio | URL |
|---|---|
| Frontend | [http://localhost:4200](http://localhost:4200) |
| Backend API | [http://localhost:3000](http://localhost:3000) |

### Build de producción

```bash
npm run build
```

Los artefactos generados se almacenan en `dist/stridesense/browser/`.

### Tests

```bash
# Ejecutar una vez
npm test

# Modo watch (desarrollo)
npm run test:watch

# Con interfaz gráfica
npm run test:ui

# Con informe de cobertura
npm run test:coverage
```

---

## 9. Estructura del repositorio

```
stridesense-frontend/
│
├── public/                        # Recursos estáticos (logo, favicon)
│
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   └── auth.guard.ts          # Protege rutas autenticadas
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor.ts    # Añade Bearer token a peticiones HTTP
│   │   │   └── services/
│   │   │       └── token-storage.service.ts  # Gestión de JWT en localStorage
│   │   │
│   │   ├── domain/                        # ── CAPA DE DOMINIO ──
│   │   │   ├── entities/                  # Modelos de negocio (User, Session, Risk)
│   │   │   ├── repositories/              # Interfaces de repositorio (contratos)
│   │   │   └── use-cases/                 # Lógica de negocio pura
│   │   │       ├── auth/                  # Login, Register, Logout
│   │   │       ├── risk/                  # GetRisk
│   │   │       ├── sessions/              # CRUD de sesiones
│   │   │       └── user/                  # GetUserProfile
│   │   │
│   │   ├── data/                          # ── CAPA DE DATOS ──
│   │   │   ├── datasources/               # Llamadas HTTP a la API REST
│   │   │   │   ├── auth.datasource.ts     # /api/auth/*
│   │   │   │   ├── session.datasource.ts  # /api/sessions/*
│   │   │   │   └── risk.datasource.ts     # /api/risk/*
│   │   │   └── repositories/              # Implementaciones de las interfaces
│   │   │
│   │   └── presentation/                  # ── CAPA DE PRESENTACIÓN ──
│   │       ├── modules/
│   │       │   ├── auth/                  # Login y Registro
│   │       │   ├── dashboard/             # Pantalla principal con métricas
│   │       │   ├── sessions/              # CRUD completo de entrenamientos
│   │       │   ├── risk/                  # Evaluación y desglose del riesgo
│   │       │   └── profile/               # Perfil del usuario
│   │       └── state/                     # NGXS: UserState, SessionsState, RiskState
│   │
│   ├── environments/                      # Variables de entorno por perfil
│   ├── styles.scss                        # Estilos globales y tokens CSS
│   └── main.ts                            # Punto de entrada de la aplicación
│
├── Dockerfile                             # Build multi-stage (Node → Nginx)
├── nginx.conf.template                    # Config Nginx con proxy a la API
├── angular.json                           # Configuración del workspace Angular
├── tsconfig.json                          # Configuración TypeScript base
├── vitest.config.ts                       # Configuración de Vitest
└── package.json                           # Dependencias y scripts npm
```

---

## 10. Uso

### Flujo principal

```
1. Registro / Inicio de sesión
         │
         ▼
2. Dashboard
   - Riesgo actual (indicador visual circular)
   - Sesión más reciente
   - Carga semanal y cadencia media
         │
         ├──▶ 3. Gestión de sesiones
         │        - Listar, crear, editar, eliminar
         │        - Campos: deporte, duración, distancia, FC, cadencia, notas
         │
         └──▶ 4. Evaluación de riesgo detallada
                  - Puntuación global y nivel (Bajo / Medio / Alto)
                  - Cuatro factores clínicos con barra de progreso
                  - Predicción ML (TensorFlow.js) con nivel de confianza
                  - Leyendas explicativas para el usuario final
```

### Endpoints de la API consumidos

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/auth/register` | Registro de usuario |
| `POST` | `/api/auth/login` | Autenticación y obtención de JWT |
| `GET` | `/api/auth/me` | Perfil del usuario autenticado |
| `GET` | `/api/sessions` | Listado de sesiones del usuario |
| `POST` | `/api/sessions` | Crear nueva sesión |
| `PATCH` | `/api/sessions/:id` | Actualizar sesión existente |
| `DELETE` | `/api/sessions/:id` | Eliminar sesión |
| `GET` | `/api/risk/summary` | Resumen de riesgo (reglas + ML) |

### Tipos de deporte soportados

| Clave | Etiqueta |
|---|---|
| `running` | Carrera |
| `cycling` | Ciclismo |
| `swimming` | Natación |
| `strength` | Fuerza |
| `other` | Otro |

---

## 11. Metodología del TFM

El desarrollo del proyecto siguió una metodología **ágil iterativa** basada en ciclos cortos de desarrollo con entrega continua de incrementos funcionales:

- **Fase 1 — Análisis y diseño:** Definición de requisitos funcionales y no funcionales, modelado de entidades de dominio y diseño de la arquitectura limpia.
- **Fase 2 — Backend:** Implementación de la API REST con NestJS, base de datos con Prisma ORM y modelo ML con TensorFlow.js.
- **Fase 3 — Frontend:** Desarrollo de la capa de presentación con Angular 20, NGXS y componentes standalone.
- **Fase 4 — Integración y validación:** Pruebas unitarias, integración de frontend y backend con Docker Compose, validación funcional end-to-end.
- **Fase 5 — Documentación y entrega:** Redacción de la memoria del TFM y documentación técnica del repositorio.

La separación en capas (*Clean Architecture*) fue una decisión deliberada para garantizar la **testeabilidad** del código y la **independencia tecnológica** de la lógica de negocio respecto al framework de presentación.

---

## 12. Resultados principales

| Objetivo | Estado |
|---|---|
| Autenticación JWT funcional | ✅ Completado |
| CRUD de sesiones de entrenamiento | ✅ Completado |
| Evaluación de riesgo por reglas clínicas (4 factores) | ✅ Completado |
| Predicción de riesgo con TensorFlow.js (5 métricas) | ✅ Completado |
| Interfaz completamente en español | ✅ Completado |
| Despliegue con Docker Compose | ✅ Completado |
| Cobertura de tests unitarios | 100% |

### Validación

- Los casos de uso se validan mediante **tests unitarios con Vitest** y mocks de los repositorios.
- El modelo ML fue validado con escenarios extremos (sobreentrenamiento severo → puntuación >80; usuario sedentario → puntuación <35).
- La integración frontend-backend se validó mediante pruebas funcionales manuales end-to-end con Docker Compose.

---

## 13. Limitaciones

- El modelo de red neuronal (TensorFlow.js) utiliza pesos definidos manualmente mediante conocimiento de dominio, no entrenados sobre un dataset real de lesiones deportivas. La precisión predictiva es orientativa.
- No se implementa refresco automático de token JWT (*refresh token flow*), por lo que la sesión expira tras el tiempo de vida del *access token*.
- La aplicación no dispone actualmente de tests de integración ni E2E automatizados (Cypress / Playwright).
- No se ha implementado internacionalización formal (i18n) con Angular `@angular/localize`; los textos están *hardcodeados* en español.

---

## 14. Líneas futuras de trabajo

- **Entrenamiento del modelo ML** con un dataset real de lesiones deportivas (p. ej. datos anonimizados de plataformas como Strava o Garmin Connect).
- **Integración con wearables** (Garmin, Polar, Apple Watch) mediante sus APIs públicas para importar sesiones automáticamente.
- **Notificaciones push** que alerten al usuario cuando el riesgo supere un umbral configurable.
- **Refresco automático de JWT** mediante el *refresh token* almacenado.
- **Tests E2E** con Playwright para validación automatizada del flujo completo.
- **PWA** (Progressive Web App) para uso offline y acceso desde dispositivos móviles sin instalar.
- **Panel de entrenador:** vista multi-atleta para coaches que gestionan varios deportistas.

---

## 15. Conclusiones

StrideSense demuestra que es técnicamente viable combinar una arquitectura limpia y mantenible en Angular con un modelo de aprendizaje automático ligero ejecutado directamente en el servidor mediante TensorFlow.js. La separación en capas (dominio, datos, presentación) facilita el testing unitario y la evolución independiente de cada capa, validando la hipótesis central del TFM: **la inteligencia artificial puede integrarse en aplicaciones web de salud deportiva sin sacrificar la calidad del código ni la experiencia de usuario**.

---

## 16. Autor

| Campo | Valor |
|---|---|
| **Nombre** | Iván Martínez de la Fuente |
| **Máster** | Master en desarrollo con IA |
| **Año** | 2026 |

---

## 17. Licencia

Este proyecto está distribuido bajo la licencia **MIT**.
Consulta el fichero [LICENSE](./LICENSE) para más detalles.

---

*Generado como parte del TFM — StrideSense © 2026*
