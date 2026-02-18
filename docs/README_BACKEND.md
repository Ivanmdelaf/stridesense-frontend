
# StrideSense – Backend (NestJS + Prisma + TensorFlow.js)

Backend del sistema StrideSense: API REST, seguridad JWT, Prisma ORM y módulo IA TensorFlow.js.

---

## 🚀 1. Requisitos
- Node.js 18+
- npm o pnpm
- SQLite (dev) o PostgreSQL (producción)

---

## 📦 2. Instalación
```bash
npm install
```

---
## ⚙️ 3. Variables de entorno
Crear `.env`:
```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="super_secret"
JWT_EXPIRES_IN="1d"
MODEL_BASE_PATH="./src/risk/model"
CORS_ORIGIN="http://localhost:4200"
```

---
## 🛠️ 4. Prisma
```bash
npx prisma generate
npx prisma migrate dev
```

---
## ▶️ 5. Ejecutar en desarrollo
```bash
npm run start:dev
```
Servidor: http://localhost:3000
Swagger: http://localhost:3000/api

---
## 🤖 6. IA – TensorFlow.js
- Carga del modelo desde `src/risk/model/model.json`.
- Normalización en `preprocessing.ts`.
- Predicción en `risk.service.ts`.

---
## 📡 7. Endpoints principales
- `POST /auth/register`
- `POST /auth/login`
- `POST /sessions`
- `GET /sessions/user/:id`
- `POST /risk/predict`
- `GET /risk/history/:userId`

---
## 🐳 8. Docker
### Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
CMD ["node", "dist/main.js"]
```

### Construir
```bash
docker build -t stridesense-backend .
```

### Ejecutar
```bash
docker run -p 3000:3000 --env-file .env stridesense-backend
```

---
## 🧪 9. Tests
```bash
npm run test
```
