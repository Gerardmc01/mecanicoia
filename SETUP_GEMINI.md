# 🚀 GUÍA RÁPIDA: Conectar Gemini API (5 minutos)

## ✅ Ya tienes tu API Key de Gemini
Tu clave: `AIzaSyDYqaJmsPvSQpaC-uR7RpUO-YiIGaO4S1w`

---

## Paso 1: Crear cuenta en Cloudflare (1 min)

1. Ve a: **https://dash.cloudflare.com/sign-up**
2. Crea una cuenta con tu email
3. **NO necesitas tarjeta de crédito**

---

## Paso 2: Crear el Worker (2 min)

1. Una vez dentro del dashboard, haz clic en **"Workers & Pages"** (menú lateral izquierdo)
2. Haz clic en **"Create Application"**
3. Selecciona **"Create Worker"**
4. Dale un nombre: `mecanico-ia-api` (o el que quieras)
5. Haz clic en **"Deploy"**

---

## Paso 3: Copiar el código del Worker (1 min)

1. Una vez creado, haz clic en **"Edit Code"**
2. **BORRA TODO** el código que aparece por defecto
3. Abre el archivo `worker.js` de este proyecto
4. **Copia TODO el contenido** del archivo `worker.js`
5. **Pégalo** en el editor de Cloudflare
6. Haz clic en **"Save and Deploy"** (botón azul arriba a la derecha)

---

## Paso 4: Añadir la API Key (1 min)

1. En la página del Worker, haz clic en **"Settings"** (arriba)
2. Baja hasta la sección **"Variables and Secrets"**
3. Haz clic en **"Add variable"**
4. Rellena:
   - **Variable name**: `GEMINI_API_KEY`
   - **Value**: `AIzaSyDYqaJmsPvSQpaC-uR7RpUO-YiIGaO4S1w`
   - ✅ Marca la casilla **"Encrypt"**
5. Haz clic en **"Save and Deploy"**

---

## Paso 5: Copiar la URL del Worker

1. Vuelve a la pestaña del Worker (o haz clic en el nombre del Worker en el menú)
2. Verás una URL como:
   ```
   https://mecanico-ia-api.TU-USUARIO.workers.dev
   ```
3. **COPIA ESTA URL COMPLETA**

---

## Paso 6: Configurar el Frontend

1. Abre el archivo `app.js` de tu proyecto
2. Busca la línea 214 (aproximadamente) que dice:
   ```javascript
   const API_URL = 'https://mecanico-ia-api.YOUR-SUBDOMAIN.workers.dev';
   ```
3. Reemplázala con tu URL real:
   ```javascript
   const API_URL = 'https://mecanico-ia-api.TU-USUARIO.workers.dev';
   ```
   (Pega la URL que copiaste en el Paso 5)

4. Guarda el archivo

---

## Paso 7: Subir a GitHub

```bash
git add .
git commit -m "✨ Conectar Gemini API - IA real funcionando"
git push origin main
```

---

## Paso 8: ¡PROBAR! 🎉

1. Espera 1-2 minutos a que Render despliegue los cambios
2. Ve a tu web: **https://mecanicoia.onrender.com**
3. Abre el chat de diagnóstico
4. Escribe: **"Mi coche hace un ruido extraño al frenar"**
5. ¡Deberías recibir una respuesta de Gemini en unos segundos!

---

## 🎯 Resultado Esperado

Ahora tu chat tendrá:
- ✅ **IA real de Google (Gemini)**
- ✅ **Respuestas personalizadas y contextuales**
- ✅ **Memoria de la conversación**
- ✅ **Diagnósticos profesionales**
- ✅ **100% GRATIS** (hasta 60 peticiones/minuto)

---

## ⚠️ Solución de Problemas

### "No funciona, sigue usando la IA local"
- Verifica que la URL en `app.js` sea correcta (sin `YOUR-SUBDOMAIN`)
- Asegúrate de haber hecho `git push` y que Render haya desplegado

### "Error 500 en el Worker"
- Verifica que la API Key esté bien copiada en Cloudflare
- Asegúrate de haber marcado "Encrypt"

### "La API Key no funciona"
- Ve a https://aistudio.google.com/app/apikey
- Verifica que la clave esté activa
- Si no funciona, genera una nueva

---

## 📊 Límites Gratuitos

- **Gemini API**: 60 peticiones/minuto, 1500/día
- **Cloudflare Workers**: 100,000 peticiones/día

Más que suficiente para miles de usuarios al día. 🚀

---

**¿Necesitas ayuda?** Avísame y te echo una mano.
