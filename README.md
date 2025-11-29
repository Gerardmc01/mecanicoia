# 🔧 Mecánico IA 24/7

**Tu asistente automotriz inteligente disponible 24/7**

Plataforma web completa para diagnóstico de averías, análisis de problemas automotrices, explicación de luces del tablero, comparación de modelos y generación automática de contenido para redes sociales.

---

## 🚀 Características Principales

### ✅ **Implementado y Funcional**

1. **🔍 Diagnóstico Inteligente**
   - Chat interactivo con IA mecánica
   - Diagnóstico basado en síntomas descritos
   - Respuestas contextuales sobre ruidos, olores, humos
   - Estimación de costes de reparación
   - Nivel de urgencia y gravedad

2. **💡 Explicador de Luces del Tablero**
   - Base de datos completa de 12+ luces comunes
   - Causas probables para cada luz
   - Acciones inmediatas recomendadas
   - Estimación de costes
   - Sistema de búsqueda y filtrado

3. **🎬 Generador de Contenido Automático**
   - Contenido optimizado para TikTok, Instagram Reels, YouTube Shorts
   - 5 tipos de contenido: consejos, diagnósticos, comparativas, mitos, alertas
   - Guiones completos con hook, body y CTA
   - Hashtags optimizados para SEO
   - Copiar al portapapeles con un click

4. **🚗 Mi Garage**
   - Registro de vehículos personales
   - Seguimiento de kilometraje
   - Alertas de mantenimiento preventivo
   - Almacenamiento local (localStorage)

5. **🎨 Diseño Premium**
   - Dark mode con glassmorphism
   - Animaciones fluidas y micro-interacciones
   - Totalmente responsive (móvil, tablet, desktop)
   - Gradientes vibrantes y efectos visuales modernos

### 🔄 **Preparado para Futuras Integraciones**

- **Analizador de Audio**: Reconocimiento de ruidos (requiere modelo ML)
- **Verificador de Anuncios**: Análisis de vehículos de segunda mano
- **Integración con APIs**: Precios de mercado, datos técnicos, historial

---

## 📁 Estructura del Proyecto

```
mecanico-ia-247/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos premium con CSS moderno
├── app.js              # Lógica de aplicación y funcionalidades
├── data.js             # Base de datos de conocimiento automotriz
└── README.md           # Este archivo
```

---

## 🛠️ Instalación y Uso

### **Opción 1: Uso Local**

1. **Clonar o descargar** los archivos
2. **Abrir** `index.html` en cualquier navegador moderno
3. ¡Listo! No requiere instalación ni dependencias

### **Opción 2: Despliegue en Render (Sitio Estático)**

1. **Crear repositorio en GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Mecánico IA 24/7"
   git branch -M main
   git remote add origin [TU-REPO-URL]
   git push -u origin main
   ```

2. **Desplegar en Render**:
   - Ir a [render.com](https://render.com)
   - Crear nuevo "Static Site"
   - Conectar con tu repositorio de GitHub
   - Configuración:
     - **Build Command**: (dejar vacío)
     - **Publish Directory**: `.`
   - Click en "Create Static Site"

3. **¡Listo!** Tu sitio estará disponible en: `https://tu-proyecto.onrender.com`

### **Opción 3: Otros Servicios**

- **Netlify**: Arrastra la carpeta completa a [netlify.com/drop](https://app.netlify.com/drop)
- **Vercel**: `vercel --prod`
- **GitHub Pages**: Activar en Settings > Pages
- **Cloudflare Pages**: Conectar repositorio

---

## 🎯 Módulos Principales

### 1. **Diagnóstico Inteligente**

Sistema de chat que analiza síntomas y proporciona:
- Causas probables ordenadas por frecuencia
- Nivel de gravedad (bajo, medio, alto)
- Acciones inmediatas recomendadas
- Rango de costes estimados
- Consejos preventivos

**Ejemplos de consultas**:
- "Mi coche hace un ruido metálico al frenar"
- "Sale humo blanco del escape"
- "El motor pierde potencia en subidas"
- "Se encendió la luz del motor"

### 2. **Luces del Tablero**

Base de datos con 12 luces comunes:
- Check Engine
- Presión de Aceite
- Batería/Alternador
- ABS
- Airbag
- Frenos
- Temperatura Motor
- Presión Neumáticos
- ESP/Control Estabilidad
- Combustible Bajo
- Precalentamiento (Diesel)
- Filtro Partículas (DPF)

Cada luz incluye:
- Descripción del problema
- Causas probables
- Acciones recomendadas
- Nivel de urgencia
- Coste estimado

### 3. **Generador de Contenido**

Tipos de contenido disponibles:
- **Consejo Rápido**: Tips útiles de mantenimiento
- **Diagnóstico de Fallo**: Explicación de problemas comunes
- **Comparativa**: Comparación entre modelos
- **Mito vs Realidad**: Desmintiendo creencias falsas
- **Señal de Alerta**: Advertencias importantes

Plataformas soportadas:
- TikTok (60s)
- Instagram Reels (90s)
- YouTube Shorts (60s)

### 4. **Mi Garage**

Funcionalidades:
- Añadir múltiples vehículos
- Seguimiento de kilometraje
- Cálculo automático de próximo mantenimiento
- Almacenamiento persistente (localStorage)

---

## 🔧 Personalización

### **Modificar Base de Datos de Luces**

Editar `data.js` → `dashboardLights`:

```javascript
{
    id: 'nueva-luz',
    name: 'Nombre de la Luz',
    icon: '🔴',
    color: '#EF476F',
    severity: 'high', // low, medium, high
    description: 'Descripción del problema',
    causes: ['Causa 1', 'Causa 2'],
    actions: ['Acción 1', 'Acción 2'],
    urgency: 'Nivel de urgencia',
    estimatedCost: '100€ - 500€'
}
```

### **Añadir Nuevos Templates de Contenido**

Editar `data.js` → `contentTemplates`:

```javascript
{
    hook: 'Frase de enganche',
    content: 'Contenido principal',
    cta: 'Call to action',
    hashtags: '#Tag1 #Tag2'
}
```

### **Personalizar Colores**

Editar `styles.css` → `:root`:

```css
--primary: #FF6B35;        /* Color principal */
--secondary: #4ECDC4;      /* Color secundario */
--accent: #FFE66D;         /* Color de acento */
```

---

## 🚀 Próximas Mejoras (Roadmap)

### **Fase 1: Integración con IA Real**
- [ ] Conectar con OpenAI API / Anthropic Claude
- [ ] Mejorar respuestas contextuales
- [ ] Memoria de conversación

### **Fase 2: Funcionalidades Avanzadas**
- [ ] Analizador de audio de ruidos
- [ ] Reconocimiento de imágenes (luces del tablero)
- [ ] Verificador de anuncios de segunda mano
- [ ] Comparador de modelos con datos reales

### **Fase 3: Datos en Tiempo Real**
- [ ] Integración con APIs de precios de reparación
- [ ] Datos de mercado de vehículos usados
- [ ] Información técnica de modelos
- [ ] Historial de vehículos (si disponible)

### **Fase 4: Monetización**
- [ ] Google AdSense
- [ ] Enlaces de afiliados (piezas, herramientas)
- [ ] Plan premium con funciones avanzadas
- [ ] API para talleres

### **Fase 5: Contenido Automatizado**
- [ ] Generación automática de artículos SEO
- [ ] Publicación automática en redes sociales
- [ ] Generación de voz para videos
- [ ] Edición automática de videos cortos

---

## 📊 SEO y Optimización

### **Palabras Clave Objetivo**

- "diagnóstico coche online"
- "qué significa luz motor"
- "mi coche hace ruido"
- "cuánto cuesta reparar [problema]"
- "comparar [modelo1] vs [modelo2]"
- "mantenimiento coche"
- "problemas comunes [marca/modelo]"

### **Contenido Long-Tail**

Ejemplos de artículos a generar:
- "Por qué mi coche hace ruido metálico al frenar"
- "Cuánto cuesta cambiar pastillas de freno en España"
- "Qué hacer si se enciende la luz del motor"
- "Toyota Corolla vs Volkswagen Golf: ¿Cuál comprar?"
- "Mantenimiento preventivo: calendario completo"

---

## 🎨 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno con variables CSS, Grid, Flexbox
- **JavaScript (Vanilla)**: Sin frameworks, máximo rendimiento
- **LocalStorage**: Persistencia de datos del usuario
- **Google Fonts**: Inter & Space Grotesk

---

## 📱 Compatibilidad

✅ **Navegadores Modernos**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

✅ **Dispositivos**:
- Desktop (1920px+)
- Laptop (1280px - 1920px)
- Tablet (768px - 1280px)
- Mobile (320px - 768px)

---

## 📄 Licencia

Este proyecto es de código abierto. Puedes usarlo, modificarlo y distribuirlo libremente.

---

## 🤝 Contribuciones

¿Quieres mejorar el proyecto?

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Añadir nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

## 📞 Soporte

Para reportar bugs o sugerir mejoras, abre un issue en GitHub.

---

## 🎯 Objetivos del Proyecto

1. **Ayudar a conductores** a entender problemas de sus vehículos
2. **Reducir costes** evitando reparaciones innecesarias
3. **Educar** sobre mantenimiento preventivo
4. **Generar contenido útil** para redes sociales
5. **Crear comunidad** en torno a la mecánica automotriz

---

## 🔥 Características Destacadas

- ✅ **100% Funcional** sin necesidad de backend
- ✅ **Cero dependencias** externas
- ✅ **Diseño Premium** con animaciones fluidas
- ✅ **SEO Optimizado** desde el código
- ✅ **Responsive** en todos los dispositivos
- ✅ **Rápido** - carga instantánea
- ✅ **Offline-ready** - funciona sin conexión una vez cargado

---

**Desarrollado con ❤️ para la comunidad automotriz**

🔧 **Mecánico IA 24/7** - Tu asistente automotriz siempre disponible
