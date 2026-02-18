# README Técnico Ampliado – Frontend (Angular 17+)

Este documento actúa como anexo técnico del TFM **StrideSense**, detallando el proceso completo de creación, configuración, arquitectura y despliegue del frontend desarrollado con **Angular 17+**.

---
# 1. Objetivo del frontend
El frontend de StrideSense sirve como interfaz principal para el usuario corredor. Sus funciones clave incluyen:
- Registro de sesiones de entrenamiento.
- Visualización del riesgo de lesión.
- Gestión de usuario (registro y login).
- Presentación de métricas clave.
- Interacción con el backend NestJS y el modelo IA.

---
# 2. Creación del proyecto
```bash
ng new stridesense-frontend --routing --style=scss
cd stridesense-frontend
```
Se habilitó routing desde el inicio y SCSS para mejor control de estilos.

---
# 3. Instalación de dependencias
### 3.1 Gestión de estado
```bash
npm i @ngxs/store
```
### 3.2 Gráficos (para donut de riesgo)
```bash
npm i chart.js ng2-charts
```
### 3.3 UI (opcional)
```bash
ng add @angular/material
```
También se integró TailwindCSS para estilo Apple Fitness.

---
# 4. Arquitectura interna
```
src/app/
 ├─ core/                 # servicios globales (auth, api), interceptores
 ├─ modules/
 │   ├─ dashboard/        # riesgo y métricas
 │   ├─ sessions/         # formulario para entrenamientos
 │   ├─ auth/             # login/registro
 │   ├─ risk/             # componentes de riesgo
 │   └─ profile/
 ├─ shared/               # componentes comunes
 └─ state/                # NGXS/NGRX
```

---
# 5. Configuración de entorno
```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/api'
};
```

---
# 6. Flujo de predicción
1. Usuario registra una sesión.
2. Frontend envía datos a `POST /risk/predict`.
3. Backend responde con `{ riskLevel, scores }`.
4. Angular actualiza el dashboard y dibuja el donut.

---
# 7. Ejecución en desarrollo
```bash
npm install
npm start
```
App disponible en `http://localhost:4200`

---
# 8. Build de producción
```bash
npm run build
```
El contenido generado en `/dist` puede desplegarse en producción.

---
# 9. Docker
## 9.1 Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
CMD ["npx", "http-server", "dist/stridesense-frontend", "-p", "4200"]
```
## 9.2 Construcción
```bash
docker build -t stridesense-frontend .
```
## 9.3 Ejecución
```bash
docker run -p 4200:4200 stridesense-frontend
```

---
# 10. Pruebas
```bash
npm run test
```
Se incluyen pruebas unitarias con Vitest y Testing Library.

---
# 11. Conclusión
El frontend aporta una interfaz moderna, clara y funcional, inspirada en Apple Fitness, facilitando al usuario la comprensión inmediata de su estado de riesgo.
