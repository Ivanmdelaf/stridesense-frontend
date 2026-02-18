# README Técnico Ampliado – Backend (NestJS + Prisma + TensorFlow.js)

Anexo técnico del TFM **StrideSense**, detallando la arquitectura, flujo y puesta en marcha del backend.

---
# 1. Objetivo del backend
- Exponer API REST segura.
- Persistir usuarios, sesiones y predicciones.
- Ejecutar inferencia IA (TensorFlow.js).
- Preprocesar datos y calcular métricas derivadas.

---
# 2. Creación del proyecto
```bash
nest new stridesense-backend
cd stridesense-backend
```

---
# 3. Instalación de dependencias
## 3.1 Prisma ORM
```bash
npm i prisma @prisma/client
npx prisma init
```
## 3.2 Seguridad
```bash
npm i bcrypt @nestjs/jwt passport passport-jwt @nestjs/passport
```
## 3.3 Validación
```bash
npm i class-validator class-transformer
```
## 3.4 TensorFlow.js (Node)
```bash
npm i @tensorflow/tfjs-node
```

---
# 4. Modelo de datos (Prisma)
Entidades principales: **User**, **TrainingSession**, **Prediction**.
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---
# 5. Arquitectura interna
```
src/
 ├─ auth/             # autenticación, JWT
 ├─ users/            # usuario
 ├─ sessions/         # sesiones de entrenamiento
 ├─ risk/             # IA (TF.js)
 │    ├─ model/
 │    ├─ risk.service.ts
 │    └─ preprocessing.ts
 ├─ recommendations/  # reglas por riesgo
 ├─ prisma/
 ├─ common/
 └─ main.ts
```

---
# 6. IA – TensorFlow.js
Modelo:
- 32 neuronas → 16 neuronas → 3 (softmax)
- normalización z-score / min-max
Modelos almacenados en:
```
src/risk/model/model.json
src/risk/model/weights.bin
```

---
# 7. Endpoints principales
- `POST /auth/register`
- `POST /auth/login`
- `POST /sessions`
- `GET /sessions/user/:id`
- `POST /risk/predict`
- `GET /risk/history/:userId`
Swagger disponible en `/api`.

---
# 8. Variables de entorno
```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="super_secret"
JWT_EXPIRES_IN="1d"
MODEL_BASE_PATH="./src/risk/model"
CORS_ORIGIN="http://localhost:4200"
```

---
# 9. Desarrollo
```bash
npm install
npx prisma generate
npm run start:dev
```
Backend en `http://localhost:3000`.

---
# 10. Docker
## 10.1 Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
CMD ["node", "dist/main.js"]
```
## 10.2 Construcción
```bash
docker build -t stridesense-backend .
```
## 10.3 Ejecución
```bash
docker run -p 3000:3000 --env-file .env stridesense-backend
```

---
# 11. Pruebas
```bash
npm run test
```
Pruebas unitarias (servicios, validadores), integración (SuperTest), seguridad (JWT).

---
# 12. Conclusión
El backend combina NestJS, Prisma y TensorFlow.js para ofrecer una arquitectura segura, modular y con IA integrada directamente sin microservicios adicionales.
