# Frontend SecureDesk ADSO

Instrucciones rápidas para desarrollo:

1. Instalar dependencias:

```powershell
cd frontend
npm install
```

2. Levantar servidor de desarrollo (puerto forzado 5173):

```powershell
npm run dev
```

3. Abrir en el navegador:

http://localhost:5173/login

Notas:
- Si el puerto está ocupado, cambia `dev` script o detén el proceso que lo usa.
- Backend debe ejecutarse en http://localhost:3000 para autenticación e incidentes.
