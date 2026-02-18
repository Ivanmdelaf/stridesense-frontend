
# StrideSense – Frontend (Angular 17+)

Aplicación Angular del TFM *StrideSense*, encargada del dashboard, registro de sesiones y visualización del riesgo.

---

## 🚀 1. Requisitos
- Node.js 18+
- Angular CLI 17+
- npm o pnpm

---
## 📦 2. Instalación
```bash
npm install
```

---
## 🛠️ 3. Desarrollo
```bash
npm start   # o ng serve
```
App en: http://localhost:4200

---
## 🌐 4. Configuración API Backend
Editar `src/environments/environment.ts`:
```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/api'
};
```

---
## 📁 5. Estructura principal
```
src/app/
  core/
  modules/
    dashboard/
    sessions/
    auth/
    risk/
    profile/
  shared/
  state/
```

---
## 🔄 6. Flujo de predicción
1. El usuario registra una sesión.
2. Se envían datos a `/risk/predict`.
3. Se recibe `{ riskLevel, scores }`.
4. Se renderiza donut + recomendación.

---
## 🐳 7. Docker
### Crear imagen
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
CMD ["npx", "http-server", "dist/stridesense-frontend", "-p", "4200"]
```

### Construir
```bash
docker build -t stridesense-frontend .
```

### Ejecutar
```bash
docker run -p 4200:4200 stridesense-frontend
```

---
## 🧪 8. Tests
```bash
npm run test
```

---
## 📦 9. Build producción
```bash
npm run build
```
