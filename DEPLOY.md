# 🚀 Guía Rápida de Despliegue en Render

## Paso 1: Crear Repositorio en GitHub

1. **Crea un nuevo repositorio** en GitHub (público o privado)
   - Nombre sugerido: `mecanico-ia-247`
   - No inicialices con README (ya tenemos uno)

2. **Sube el código** desde la terminal:

```bash
cd mecanico-ia-247
git init
git add .
git commit -m "🔧 Initial commit: Mecánico IA 24/7 - Plataforma completa"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/mecanico-ia-247.git
git push -u origin main
```

---

## Paso 2: Desplegar en Render

### **Opción A: Desde el Dashboard de Render**

1. Ve a [render.com](https://render.com) y crea una cuenta (gratis)

2. Click en **"New +"** → **"Static Site"**

3. Conecta tu cuenta de GitHub

4. Selecciona el repositorio `mecanico-ia-247`

5. Configuración:
   - **Name**: `mecanico-ia-247` (o el que prefieras)
   - **Branch**: `main`
   - **Build Command**: (dejar vacío)
   - **Publish Directory**: `.`

6. Click en **"Create Static Site"**

7. ¡Listo! En 1-2 minutos estará desplegado en:
   ```
   https://mecanico-ia-247.onrender.com
   ```

### **Opción B: Usando render.yaml (Automático)**

1. El archivo `render.yaml` ya está configurado

2. En Render, selecciona **"New +"** → **"Blueprint"**

3. Conecta el repositorio

4. Render detectará automáticamente la configuración

---

## Paso 3: Configurar Dominio Personalizado (Opcional)

1. En Render, ve a tu Static Site

2. Click en **"Settings"** → **"Custom Domain"**

3. Añade tu dominio (ej: `www.mecanicoai247.com`)

4. Configura los DNS según las instrucciones de Render

---

## Alternativas a Render

### **Netlify** (Más fácil)

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Desplegar
cd mecanico-ia-247
netlify deploy --prod
```

O simplemente arrastra la carpeta a: [netlify.com/drop](https://app.netlify.com/drop)

### **Vercel**

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
cd mecanico-ia-247
vercel --prod
```

### **GitHub Pages**

1. En GitHub, ve a **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** → **/ (root)**
4. Save

Tu sitio estará en: `https://TU-USUARIO.github.io/mecanico-ia-247`

### **Cloudflare Pages**

1. Ve a [pages.cloudflare.com](https://pages.cloudflare.com)
2. Conecta tu repositorio de GitHub
3. Build settings:
   - **Build command**: (vacío)
   - **Build output directory**: `/`
4. Deploy

---

## Actualizar el Sitio

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

Render/Netlify/Vercel detectarán automáticamente los cambios y redesplegarán.

---

## Verificar que Todo Funciona

Después del despliegue, verifica:

- ✅ Página principal carga correctamente
- ✅ Navegación funciona
- ✅ Chat de diagnóstico responde
- ✅ Luces del tablero se muestran
- ✅ Generador de contenido funciona
- ✅ Se pueden añadir vehículos al garage
- ✅ Diseño responsive en móvil

---

## Solución de Problemas

### **Error: Página en blanco**

- Verifica que el **Publish Directory** sea `.` (punto)
- Asegúrate de que `index.html` esté en la raíz

### **JavaScript no funciona**

- Abre la consola del navegador (F12)
- Verifica que no haya errores
- Comprueba que `app.js` y `data.js` se carguen correctamente

### **Estilos no se aplican**

- Verifica que `styles.css` esté en la misma carpeta que `index.html`
- Comprueba la ruta en el `<link>` del HTML

---

## Optimizaciones Post-Despliegue

### **1. SEO**

Añade en `index.html` (ya incluido):
- Meta description
- Open Graph tags
- Twitter Cards

### **2. Analytics**

Añade Google Analytics:

```html
<!-- Antes de </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### **3. AdSense**

Añade el código de AdSense donde quieras mostrar anuncios.

---

## Próximos Pasos

1. **Promoción**:
   - Compartir en redes sociales
   - Crear contenido en TikTok/Instagram usando el generador
   - Optimizar para palabras clave específicas

2. **Mejoras**:
   - Integrar IA real (OpenAI API)
   - Añadir más luces del tablero
   - Expandir base de datos de problemas comunes

3. **Monetización**:
   - Google AdSense
   - Enlaces de afiliados
   - Plan premium

---

**¡Tu plataforma está lista para conquistar el mundo automotriz! 🚗💨**
