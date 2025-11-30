# 🚀 Guía de Despliegue - Backend Gemini API

## Paso 1: Obtener API Key de Gemini

1. Ve a: https://aistudio.google.com/app/apikey
2. Haz clic en **"Create API Key"**
3. Copia la clave (empieza con `AIza...`)
4. **Guárdala en un lugar seguro** (la necesitarás en el Paso 3)

---

## Paso 2: Crear cuenta en Cloudflare (GRATIS)

1. Ve a: https://dash.cloudflare.com/sign-up
2. Crea una cuenta (email + contraseña)
3. **NO necesitas tarjeta de crédito** para Workers

---

## Paso 3: Desplegar el Worker

### Opción A: Desde el Dashboard (MÁS FÁCIL)

1. Ve a: https://dash.cloudflare.com/
2. En el menú lateral, haz clic en **"Workers & Pages"**
3. Haz clic en **"Create Application"** → **"Create Worker"**
4. Dale un nombre: `mecanico-ia-api`
5. Haz clic en **"Deploy"**
6. Una vez creado, haz clic en **"Edit Code"**
7. **Borra todo** el código que aparece
8. **Copia y pega** el contenido del archivo `worker.js` de este proyecto
9. Haz clic en **"Save and Deploy"**

### Configurar la API Key (IMPORTANTE)

1. En la página del Worker, ve a **"Settings"** → **"Variables"**
2. En la sección **"Environment Variables"**, haz clic en **"Add variable"**
3. Añade:
   - **Variable name**: `GEMINI_API_KEY`
   - **Value**: Tu API Key de Gemini (la que copiaste en el Paso 1)
   - Marca la casilla **"Encrypt"** (para que sea secreta)
4. Haz clic en **"Save and Deploy"**

### Obtener la URL del Worker

1. En la página del Worker, verás una URL como:
   ```
   https://mecanico-ia-api.TU-USUARIO.workers.dev
   ```
2. **Copia esta URL** (la necesitarás para el frontend)

---

### Opción B: Desde la Terminal (AVANZADO)

Si prefieres usar la terminal:

```bash
# Instalar Wrangler (CLI de Cloudflare)
npm install -g wrangler

# Login en Cloudflare
wrangler login

# Desplegar el Worker
wrangler deploy

# Añadir la API Key como secreto
wrangler secret put GEMINI_API_KEY
# (Te pedirá que pegues la API Key)
```

---

## Paso 4: Conectar el Frontend

1. Abre el archivo `app.js` de tu proyecto
2. Busca la línea que dice:
   ```javascript
   const API_URL = 'TU_WORKER_URL_AQUI';
   ```
3. Reemplázala con la URL de tu Worker:
   ```javascript
   const API_URL = 'https://mecanico-ia-api.TU-USUARIO.workers.dev';
   ```
4. Guarda el archivo
5. Sube los cambios a GitHub:
   ```bash
   git add .
   git commit -m "✨ Conectar Gemini API"
   git push origin main
   ```

---

## Paso 5: Probar

1. Ve a tu web: https://mecanicoia.onrender.com
2. Abre el chat de diagnóstico
3. Escribe: "Mi coche hace un ruido extraño al frenar"
4. ¡Deberías recibir una respuesta de Gemini! 🎉

---

## Solución de Problemas

### Error: "API Key inválida"
- Verifica que copiaste bien la API Key de Google AI Studio
- Asegúrate de que la variable se llama exactamente `GEMINI_API_KEY`
- Revisa que marcaste la casilla "Encrypt"

### Error: "CORS"
- El Worker ya tiene configurado CORS para aceptar peticiones desde cualquier origen
- Si aún tienes problemas, verifica que la URL del Worker sea correcta

### Error: "Worker no responde"
- Verifica que el Worker esté desplegado (estado "Active")
- Revisa los logs en el dashboard de Cloudflare

---

## Límites Gratuitos

- **Gemini API**: 60 peticiones/minuto, 1500/día (más que suficiente)
- **Cloudflare Workers**: 100,000 peticiones/día (gratis para siempre)

---

## Próximos Pasos (Opcional)

- Añadir rate limiting para evitar abusos
- Implementar caché para respuestas comunes
- Añadir analytics para ver qué preguntan los usuarios

---

**¿Necesitas ayuda?** Abre un issue en GitHub o contáctame.
