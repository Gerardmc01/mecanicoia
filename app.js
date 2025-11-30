// ============================================
// MECÁNICO IA 24/7 - Main Application Logic
// ============================================

// State Management
const state = {
    currentModule: 'inicio',
    chatHistory: [],
    userVehicles: JSON.parse(localStorage.getItem('userVehicles')) || [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || []
};

// ============================================
// INITIALIZATION
// ============================================



function initializeApp() {
    console.log('🔧 Mecánico IA 24/7 initialized');

    // Add initial assistant message
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages && chatMessages.children.length === 1) {
        // Already has initial message from HTML
    }
}

// ============================================
// EVENT LISTENERS
// ============================================



// ============================================
// NAVIGATION
// ============================================

function handleNavigation(e) {
    const href = e.target.getAttribute('href');

    // Only handle internal anchors
    if (href && href.startsWith('#')) {
        e.preventDefault();
        const sectionId = href.substring(1);
        scrollToSection(sectionId);

        // Update active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        e.target.classList.add('active');
    }
    // If it's not an anchor (e.g. blog.html), let the browser handle it naturally
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const sectionTop = section.offsetTop - navHeight;
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

function setupScrollEffects() {
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for navbar
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .info-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');

    if (navMenu && menuToggle) {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }
}

// ============================================
// CHAT / DIAGNOSTIC MODULE
// ============================================

async function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    const message = chatInput.value.trim();

    if (!message) return;

    // Add user message
    addChatMessage(message, 'user');
    chatInput.value = '';
    chatInput.style.height = 'auto';

    // Hide suggestions after first message
    const suggestions = document.getElementById('chatSuggestions');
    if (suggestions && state.chatHistory.length === 0) {
        suggestions.style.display = 'none';
    }

    // Save to history
    state.chatHistory.push({ role: 'user', content: message });

    // Show typing indicator
    const typingIndicator = addTypingIndicator();

    // Simulate AI response (in production, this would call your AI API)
    setTimeout(() => {
        typingIndicator.remove();
        const response = generateDiagnosticResponse(message);
        addChatMessage(response, 'assistant');
        state.chatHistory.push({ role: 'assistant', content: response });
    }, 1500);
}

function addChatMessage(text, role) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'assistant' ? '🔧' : '👤';

    const content = document.createElement('div');
    content.className = 'message-content';

    const messageText = document.createElement('div');
    messageText.className = 'message-text';
    messageText.innerHTML = formatMessage(text);

    content.appendChild(messageText);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const indicator = document.createElement('div');
    indicator.className = 'message assistant-message typing-indicator';
    indicator.innerHTML = `
        <div class="message-avatar">🔧</div>
        <div class="message-content">
            <div class="message-text">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return indicator;
}

function formatMessage(text) {
    // Convert markdown-style formatting
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
}

function generateDiagnosticResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // Check for noise-related issues
    if (lowerMessage.includes('ruido') || lowerMessage.includes('sonido') || lowerMessage.includes('chirrido')) {
        if (lowerMessage.includes('freno') || lowerMessage.includes('frenar')) {
            return `🔍 **Diagnóstico: Ruido al frenar**

**Causas más probables:**
1. **Pastillas de freno gastadas** (70% probabilidad) - Las pastillas tienen un indicador de desgaste que hace ruido cuando están al límite
2. **Discos de freno cristalizados** (20%) - Por sobrecalentamiento o uso intenso
3. **Piedras o suciedad** (10%) - Entre la pastilla y el disco

**Nivel de gravedad:** ⚠️ MEDIO-ALTO
Si es un chirrido metálico constante, las pastillas están muy gastadas.

**Qué hacer:**
✅ Revisar grosor de pastillas (mínimo 3mm)
✅ Inspeccionar estado de discos
✅ No demorar la reparación - puede dañar los discos

**Coste estimado:** 150€ - 400€ (pastillas + mano de obra)
Si hay que cambiar discos: 300€ - 600€

**Consejo:** Si el ruido solo ocurre en las primeras frenadas del día y luego desaparece, puede ser condensación normal. Si es constante, revisar urgente.

¿Quieres que te explique cómo revisar tú mismo el grosor de las pastillas?`;
        }

        if (lowerMessage.includes('motor')) {
            return `🔍 **Diagnóstico: Ruido en el motor**

**Necesito más información:**
- ¿Es un ruido metálico, silbido, golpeteo o traqueteo?
- ¿Ocurre en ralentí, al acelerar o siempre?
- ¿Desde cuándo lo notas?

**Posibles causas según tipo de ruido:**

**Silbido agudo:** 
- Correa auxiliar desgastada (común, 80€-200€)
- Fuga en turbo (si lo tiene)

**Golpeteo metálico:**
- ⚠️ Nivel de aceite bajo (REVISAR YA)
- Taqués hidráulicos
- Bielas (grave, 2000€+)

**Traqueteo al acelerar:**
- Picado de bielas (usar combustible mejor)
- Sensor de detonación

**Acción inmediata:**
1. Revisar nivel de aceite
2. Escuchar si el ruido cambia con las revoluciones
3. Grabar un audio si es posible

¿Puedes darme más detalles sobre el tipo de ruido?`;
        }
    }

    // Check for warning lights
    if (lowerMessage.includes('luz') || lowerMessage.includes('testigo') || lowerMessage.includes('tablero')) {
        if (lowerMessage.includes('motor') || lowerMessage.includes('check')) {
            return `🔍 **Luz Check Engine encendida**

**¿Qué significa?**
El sistema de gestión del motor ha detectado un problema. Puede ser desde algo simple hasta grave.

**Causas más comunes:**
1. **Tapón de gasolina mal cerrado** (5% casos) - Revísalo primero
2. **Sensor de oxígeno** (30%) - 150€-300€
3. **Catalizador** (15%) - 400€-1200€
4. **Bujías** (20%) - 80€-200€
5. **Sensor MAF** (10%) - 100€-250€

**¿Qué hacer?**
✅ Comprar lector OBD2 (15€-30€ en Amazon) o ir a taller para escanear códigos
✅ Revisar nivel de aceite
✅ Verificar tapón de combustible
✅ Anotar si el coche pierde potencia, consume más o funciona raro

**Urgencia:** 
- Si la luz parpadea: ⚠️ DETENER - fallo grave
- Si está fija: Revisar en 1-2 días

**Consejo pro:** Muchos talleres escanean códigos gratis. También puedes comprar un lector OBD2 bluetooth por 20€ y usar app gratuita en el móvil.

¿Notas algún otro síntoma (pérdida potencia, consumo alto, ralentí irregular)?`;
        }
    }

    // Check for power loss
    if (lowerMessage.includes('potencia') || lowerMessage.includes('fuerza') || lowerMessage.includes('acelera')) {
        return `🔍 **Diagnóstico: Pérdida de potencia**

**Causas más probables:**

**Si es gradual (empeora con el tiempo):**
1. **Filtro de aire sucio** (40%) - Fácil, 20€-40€
2. **Inyectores obstruidos** (30%) - Limpieza 100€-200€
3. **Turbo con problemas** (si lo tiene) - 500€-2000€

**Si es repentino:**
1. **Sensor MAF defectuoso** - 100€-250€
2. **Válvula EGR bloqueada** - 150€-400€
3. **Filtro de combustible** - 30€-80€

**Si solo en subidas:**
- Embrague patinando (manual) - 400€-900€
- Convertidor de par (automático) - 800€-2000€

**Prueba rápida:**
1. Revisar filtro de aire (abre la caja y míralo)
2. Usar limpiador de inyectores (aditivo) - 10€
3. Escanear códigos de error

**Coste estimado:** 20€ - 2000€ según causa

¿La pérdida es gradual o repentina? ¿Solo en subidas o siempre?`;
    }

    // Check for smoke
    if (lowerMessage.includes('humo')) {
        let color = 'no especificado';
        if (lowerMessage.includes('blanco')) color = 'blanco';
        if (lowerMessage.includes('azul')) color = 'azul';
        if (lowerMessage.includes('negro')) color = 'negro';

        if (color === 'blanco') {
            return `🔍 **Humo blanco del escape**

**Causas:**

**Humo blanco al arrancar en frío (desaparece):**
✅ **NORMAL** - Es condensación de agua

**Humo blanco constante:**
⚠️ **Refrigerante entrando en motor**
- Junta de culata dañada (800€-1500€)
- Culata agrietada (1500€-3000€)
- Bloque motor fisurado (grave)

**Síntomas adicionales si es grave:**
- Nivel de refrigerante baja constantemente
- Aceite con aspecto lechoso
- Motor se calienta más de lo normal
- Pérdida de potencia

**Qué hacer:**
1. Revisar nivel de refrigerante
2. Revisar aceite (si está lechoso, GRAVE)
3. Oler el humo (si huele dulce, es refrigerante)
4. No seguir conduciendo si es constante

**Urgencia:** Alta si es constante

¿El humo solo sale al arrancar o es constante?`;
        }

        if (color === 'azul') {
            return `🔍 **Humo azul del escape**

**Causa:** Motor quemando aceite ⚠️

**Origen del problema:**
1. **Segmentos de pistón gastados** (común en motores con km)
2. **Retenes de válvula** (más barato de reparar)
3. **Turbo con fuga de aceite** (si lo tiene)

**Gravedad:** ALTA - El motor está desgastado

**Síntomas adicionales:**
- Consumo de aceite elevado
- Pérdida de potencia
- Más humo al acelerar fuerte

**Coste reparación:**
- Retenes de válvula: 400€-800€
- Segmentos (rectificado motor): 1500€-3000€
- Turbo: 500€-1500€

**Qué hacer ahora:**
1. Revisar nivel de aceite semanalmente
2. No dejar que baje del mínimo
3. Valorar si merece la pena reparar según valor del coche
4. Considerar vender "tal cual" si el coche es viejo

**Consejo:** Si el coche tiene más de 200.000 km y vale menos de 3000€, puede no merecer la pena repararlo.

¿Cuánto aceite consume aproximadamente?`;
        }

        return `🔍 **Humo del escape**

Para darte un diagnóstico preciso, necesito saber:
- **¿De qué color es el humo?** (blanco, azul, negro)
- ¿Sale solo al arrancar o constantemente?
- ¿Cuándo lo notas más?

**Guía rápida:**
- **Blanco:** Agua/refrigerante
- **Azul:** Aceite quemándose
- **Negro:** Exceso de combustible

¿Puedes especificar el color?`;
    }

    // Default response
    return `🔧 **Entiendo tu consulta**

He registrado tu problema: "${userMessage}"

Para darte un diagnóstico más preciso, necesito algunos detalles:

**Información útil:**
- Marca y modelo del coche
- Año aproximado
- Kilometraje
- ¿Cuándo ocurre el problema? (arranque, marcha, frenado...)
- ¿Es constante o intermitente?
- ¿Hay ruidos, olores o luces encendidas?

**Mientras tanto, puedes:**
- Revisar el nivel de aceite y refrigerante
- Verificar presión de neumáticos
- Comprobar si hay luces de aviso en el tablero
- Escanear códigos de error si tienes lector OBD2

También puedes usar las **sugerencias rápidas** arriba o consultar la sección de **Luces del Tablero** si tienes algún testigo encendido.

¿Puedes darme más detalles sobre el problema?`;
}

// ============================================
// DASHBOARD LIGHTS MODULE
// ============================================

function loadDashboardLights() {
    const lightsGrid = document.getElementById('lightsGrid');
    if (!lightsGrid) return;

    lightsGrid.innerHTML = '';

    dashboardLights.forEach(light => {
        const lightCard = createLightCard(light);
        lightsGrid.appendChild(lightCard);
    });
}

function createLightCard(light) {
    const card = document.createElement('div');
    card.className = 'light-card';
    card.innerHTML = `
        <div class="light-icon" style="filter: drop-shadow(0 0 10px ${light.color})">${light.icon}</div>
        <div class="light-name">${light.name}</div>
        <span class="light-severity severity-${light.severity}">${getSeverityText(light.severity)}</span>
        <p class="light-description">${light.description}</p>
    `;

    card.addEventListener('click', () => {
        showLightDetails(light);
    });

    return card;
}

function getSeverityText(severity) {
    const texts = {
        low: 'Baja',
        medium: 'Media',
        high: 'Alta'
    };
    return texts[severity] || severity;
}

function showLightDetails(light) {
    const modal = document.getElementById('lightModal');
    const modalBody = document.getElementById('lightModalBody');

    modalBody.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="font-size: 5rem; filter: drop-shadow(0 0 20px ${light.color})">${light.icon}</div>
            <h2 style="margin: 1rem 0;">${light.name}</h2>
            <span class="light-severity severity-${light.severity}">${getSeverityText(light.severity)}</span>
        </div>

        <div style="background: var(--bg-glass); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
            <h3 style="margin-bottom: 0.5rem;">📋 Descripción</h3>
            <p style="color: var(--text-secondary);">${light.description}</p>
        </div>

        <div style="background: var(--bg-glass); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
            <h3 style="margin-bottom: 1rem;">🔍 Causas Probables</h3>
            <ul style="list-style: none; padding: 0;">
                ${light.causes.map(cause => `
                    <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative; color: var(--text-secondary);">
                        <span style="position: absolute; left: 0; color: var(--primary);">→</span>
                        ${cause}
                    </li>
                `).join('')}
            </ul>
        </div>

        <div style="background: var(--bg-glass); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
            <h3 style="margin-bottom: 1rem;">✅ Qué Hacer</h3>
            <ol style="padding-left: 1.5rem; color: var(--text-secondary);">
                ${light.actions.map(action => `<li style="padding: 0.5rem 0;">${action}</li>`).join('')}
            </ol>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="background: var(--bg-glass); padding: 1rem; border-radius: var(--radius-md); text-align: center;">
                <div style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem;">Urgencia</div>
                <div style="font-weight: 600;">${light.urgency}</div>
            </div>
            <div style="background: var(--bg-glass); padding: 1rem; border-radius: var(--radius-md); text-align: center;">
                <div style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 0.5rem;">Coste Estimado</div>
                <div style="font-weight: 600; color: var(--primary);">${light.estimatedCost}</div>
            </div>
        </div>
    `;

    openModal('lightModal');
}

function filterLights(query) {
    const lightsGrid = document.getElementById('lightsGrid');
    const cards = lightsGrid.querySelectorAll('.light-card');
    const searchTerm = query.toLowerCase();

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}


// ============================================
// ADVANCED GARAGE SYSTEM
// ============================================

let currentVehicleId = null;

function loadUserVehicles() {
    const select = document.getElementById('garageVehicleSelect');
    const dashboard = document.getElementById('garageDashboard');
    const emptyState = document.getElementById('garageEmptyState');

    if (!select) return;

    // Clear existing options except first
    while (select.options.length > 1) {
        select.remove(1);
    }

    if (state.userVehicles.length === 0) {
        dashboard.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    state.userVehicles.forEach((vehicle, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${vehicle.brand} ${vehicle.model} (${vehicle.year})`;
        select.appendChild(option);
    });

    // Event listener for selection
    select.addEventListener('change', (e) => {
        const index = e.target.value;
        if (index !== '') {
            loadVehicleDashboard(index);
        } else {
            dashboard.style.display = 'none';
        }
    });

    // AUTO-LOAD FIRST VEHICLE
    if (state.userVehicles.length > 0) {
        select.value = 0;
        loadVehicleDashboard(0);
    }
}

function loadVehicleDashboard(index) {
    const vehicle = state.userVehicles[index];
    currentVehicleId = index;

    const dashboard = document.getElementById('garageDashboard');
    dashboard.style.display = 'grid';

    // Update Stats
    document.getElementById('statModel').textContent = `${vehicle.brand} ${vehicle.model}`;
    document.getElementById('statYear').textContent = vehicle.year;
    document.getElementById('statKm').textContent = `${parseInt(vehicle.mileage).toLocaleString()} km`;

    // Load Maintenance
    loadMaintenanceList(vehicle);

    // Load History (if any)
    loadHistoryList(vehicle);

    // Update Visuals (ALWAYS SHOW CUPRA 3D)
    const visualContainer = document.querySelector('.visual-car-container');

    // Render Sketchfab Embed (Cupra Formentor)
    visualContainer.innerHTML = `
        <iframe title="Cupra Formentor 2021" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/fbb89efad34e4e7983234f7c95742413/embed?autostart=1&ui_theme=dark&transparent=1" style="width: 100%; height: 100%; border: none; pointer-events: auto; position: relative; z-index: 20;"></iframe>
    `;
    // Remove styling that might interfere
    visualContainer.style.background = 'transparent';
    visualContainer.style.border = 'none';

    // Reset Visual Car (only relevant for image mode, but harmless)
    resetVisualCar();
}

function loadMaintenanceList(vehicle) {
    const list = document.getElementById('maintenanceList');
    list.innerHTML = '';

    const maintenanceItems = [
        { name: 'Cambio de Aceite', interval: 15000, icon: '🛢️' },
        { name: 'Filtro de Aire', interval: 30000, icon: '💨' },
        { name: 'Pastillas de Freno', interval: 50000, icon: '🛑' },
        { name: 'Bujías', interval: 60000, icon: '⚡' },
        { name: 'Correa Distribución', interval: 100000, icon: '⚙️' }
    ];

    maintenanceItems.forEach(item => {
        const nextKm = Math.ceil(vehicle.mileage / item.interval) * item.interval;
        const remaining = nextKm - vehicle.mileage;
        const status = remaining < 1000 ? 'urgent' : (remaining < 5000 ? 'warning' : 'good');
        const color = status === 'urgent' ? '#ff4757' : (status === 'warning' ? '#ffa502' : '#2ed573');

        const div = document.createElement('div');
        div.className = 'maintenance-item';
        div.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div class="maintenance-check" onclick="toggleMaintenance(this)"></div>
                <div>
                    <div style="font-weight: 600;">${item.icon} ${item.name}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">
                        Próximo en: <span style="color: ${color}; font-weight: 700;">${remaining.toLocaleString()} km</span>
                    </div>
                </div>
            </div>
        `;
        list.appendChild(div);
    });
}

function loadHistoryList(vehicle) {
    const list = document.getElementById('historyList');
    list.innerHTML = '';

    if (!vehicle.history || vehicle.history.length === 0) {
        const empty = document.createElement('p');
        empty.style.color = 'var(--text-muted)';
        empty.style.textAlign = 'center';
        empty.style.padding = '2rem 0';
        empty.textContent = 'No hay registros. ¡Añade el primero usando el botón de arriba!';
        list.appendChild(empty);
        return;
    }

    // Sort by date desc
    const sortedHistory = [...vehicle.history].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedHistory.forEach(log => {
        const item = document.createElement('div');
        item.className = 'maintenance-item';
        item.style.flexDirection = 'column';
        item.style.alignItems = 'flex-start';
        item.style.gap = '0.5rem';

        let icon = '📝';
        if (log.type === 'mantenimiento') icon = '🛠️';
        if (log.type === 'averia') icon = '⚠️';
        if (log.type === 'modificacion') icon = '✨';
        if (log.type === 'taller') icon = '👨‍🔧';

        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; width: 100%;">
                <span style="font-weight: 600;">${icon} ${log.type.toUpperCase()}</span>
                <span style="font-size: 0.8rem; color: var(--text-muted);">${new Date(log.date).toLocaleDateString()}</span>
            </div>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0;">${log.description}</p>
            ${log.cost ? `<div style="font-size: 0.85rem; color: var(--primary); font-weight: 600;">Coste: ${log.cost}€</div>` : ''}
        `;
        list.appendChild(item);
    });
}

function handleAddLog(e) {
    e.preventDefault();
    if (currentVehicleId === null) return;

    const type = document.getElementById('logType').value;
    const date = document.getElementById('logDate').value;
    const description = document.getElementById('logDescription').value;
    const cost = document.getElementById('logCost').value;

    const newLog = {
        type,
        date,
        description,
        cost
    };

    if (!state.userVehicles[currentVehicleId].history) {
        state.userVehicles[currentVehicleId].history = [];
    }

    state.userVehicles[currentVehicleId].history.push(newLog);
    localStorage.setItem('userVehicles', JSON.stringify(state.userVehicles));

    loadHistoryList(state.userVehicles[currentVehicleId]);
    closeModal('logModal');
    e.target.reset();
}

// Connect Add Vehicle Button
document.addEventListener('DOMContentLoaded', () => {
    const addVehicleBtn = document.getElementById('addVehicleBtn');
    if (addVehicleBtn) {
        addVehicleBtn.addEventListener('click', () => openModal('vehicleModal'));
    }

    // Set today as default date for log
    const dateInput = document.getElementById('logDate');
    if (dateInput) {
        dateInput.valueAsDate = new Date();
    }
});

// Visual Car Animation Logic
function simulateAction(action) {
    const car = document.getElementById('visualCar');
    const hood = document.getElementById('carHood');
    const lights = document.querySelectorAll('.headlight');

    resetVisualCar();

    switch (action) {
        case 'oil':
        case 'battery':
            // Open Hood
            hood.classList.add('open');
            showStatusBadge(`${action === 'oil' ? '🛢️ Revisando Aceite...' : '🔋 Testeando Batería...'}`);
            break;

        case 'lights':
            // Flash Lights
            lights.forEach(l => l.classList.add('on'));
            setTimeout(() => lights.forEach(l => l.classList.remove('on')), 500);
            setTimeout(() => lights.forEach(l => l.classList.add('on')), 1000);
            setTimeout(() => lights.forEach(l => l.classList.remove('on')), 1500);
            showStatusBadge('💡 Verificando Luces...');
            break;

        case 'tires':
            // Shake Car
            car.style.transform = 'translateY(-5px)';
            setTimeout(() => car.style.transform = 'translateY(5px)', 200);
            setTimeout(() => car.style.transform = 'translateY(0)', 400);
            showStatusBadge('tyres Revisando Presión...');
            break;
    }
}

function resetVisualCar() {
    document.getElementById('carHood').classList.remove('open');
    document.querySelectorAll('.headlight').forEach(l => l.classList.remove('on'));
    document.querySelectorAll('.status-badge').forEach(b => b.classList.remove('visible'));
}

function showStatusBadge(text) {
    // Create a temporary badge or use existing ones
    const badge = document.createElement('div');
    badge.className = 'status-badge visible';
    badge.style.position = 'absolute';
    badge.style.top = '50%';
    badge.style.left = '50%';
    badge.style.transform = 'translate(-50%, -50%)';
    badge.style.zIndex = '10';
    badge.textContent = text;

    document.querySelector('.visual-car-container').appendChild(badge);

    setTimeout(() => {
        badge.remove();
    }, 2000);
}

// Tab Switching
document.querySelectorAll('.garage-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.garage-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');

        tab.classList.add('active');
        document.getElementById(`tab-${tab.dataset.tab}`).style.display = 'block';
    });
});

// Add Vehicle Handler
// Add Vehicle Handler
function handleAddVehicle(e) {
    e.preventDefault();

    const brand = document.getElementById('vehicleBrand').value;
    const model = document.getElementById('vehicleModel').value;
    const year = document.getElementById('vehicleYear').value;
    const mileage = document.getElementById('vehicleMileage').value;
    const type = document.getElementById('vehicleType').value;

    // Simulate AI Generation Experience
    closeModal('vehicleModal');

    // Show loading state if we are adding a new car
    const dashboard = document.getElementById('garageDashboard');
    const emptyState = document.getElementById('garageEmptyState');

    emptyState.style.display = 'none';
    dashboard.style.display = 'grid'; // Show dashboard immediately to show the "Generating" effect

    // Create temporary vehicle for display
    const tempVehicle = { brand, model, year, mileage, type, history: [] };

    // Show "Generating..." overlay
    const visualContainer = document.querySelector('.visual-car-container');
    const originalContent = visualContainer.innerHTML;

    visualContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #2ed573;">
            <div class="spinner" style="width: 40px; height: 40px; border: 4px solid rgba(46, 213, 115, 0.3); border-top-color: #2ed573; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 1rem;"></div>
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem;">GENERANDO MODELO 3D...</div>
            <div style="font-size: 0.9rem; opacity: 0.7; margin-top: 0.5rem;">Analizando ${brand} ${model}...</div>
        </div>
        <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
    `;

    // Simulate delay
    setTimeout(() => {
        // Restore content and save
        visualContainer.innerHTML = originalContent;

        state.userVehicles.push(tempVehicle);
        localStorage.setItem('userVehicles', JSON.stringify(state.userVehicles));

        loadUserVehicles();

        // Select the new vehicle
        const select = document.getElementById('garageVehicleSelect');
        select.value = state.userVehicles.length - 1;
        select.dispatchEvent(new Event('change'));

        e.target.reset();
    }, 3000);
}

// Edit Vehicle Functions
function openEditVehicleModal() {
    if (currentVehicleId === null) return;

    const vehicle = state.userVehicles[currentVehicleId];

    document.getElementById('editVehicleId').value = currentVehicleId;
    document.getElementById('editVehicleBrand').value = vehicle.brand;
    document.getElementById('editVehicleModel').value = vehicle.model;
    document.getElementById('editVehicleYear').value = vehicle.year;
    document.getElementById('editVehicleMileage').value = vehicle.mileage;
    document.getElementById('editVehicleType').value = vehicle.type || 'suv';

    openModal('editVehicleModal');
}

function handleEditVehicle(e) {
    e.preventDefault();

    const id = document.getElementById('editVehicleId').value;
    const brand = document.getElementById('editVehicleBrand').value;
    const model = document.getElementById('editVehicleModel').value;
    const year = document.getElementById('editVehicleYear').value;
    const mileage = document.getElementById('editVehicleMileage').value;
    const type = document.getElementById('editVehicleType').value;

    if (state.userVehicles[id]) {
        state.userVehicles[id] = {
            ...state.userVehicles[id],
            brand,
            model,
            year,
            mileage,
            type
        };

        localStorage.setItem('userVehicles', JSON.stringify(state.userVehicles));

        loadUserVehicles();

        // Reselect current vehicle to update UI
        const select = document.getElementById('garageVehicleSelect');
        select.value = id;
        select.dispatchEvent(new Event('change'));

        closeModal('editVehicleModal');
    }
}

function handleDeleteVehicle() {
    const id = document.getElementById('editVehicleId').value;

    if (confirm('¿Estás seguro de que quieres eliminar este vehículo? Esta acción no se puede deshacer.')) {
        state.userVehicles.splice(id, 1);
        localStorage.setItem('userVehicles', JSON.stringify(state.userVehicles));

        closeModal('editVehicleModal');
        loadUserVehicles();

        // Reset view
        document.getElementById('garageDashboard').style.display = 'none';
        document.getElementById('garageEmptyState').style.display = 'block';

        // Reset selector
        const select = document.getElementById('garageVehicleSelect');
        if (select) select.value = "";
    }
}

// Make functions global for onclick events
window.simulateAction = simulateAction;
window.toggleMaintenance = function (el) {
    el.classList.toggle('checked');
};
window.openModal = openModal;
window.closeModal = closeModal;
window.handleAddLog = handleAddLog;
window.openEditVehicleModal = openEditVehicleModal;
window.handleDeleteVehicle = handleDeleteVehicle;
// ============================================
// MODAL MANAGEMENT
// ============================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadDashboardLights();
    setupScrollEffects();

    // Check if we are on the garage page
    const isGaragePage = document.getElementById('garageVehicleSelect');

    if (isGaragePage) {
        loadUserVehicles();

        // Attach Form Listeners manually to avoid scope issues
        const vehicleForm = document.getElementById('vehicleForm');
        if (vehicleForm) {
            vehicleForm.addEventListener('submit', handleAddVehicle);
        }

        const logForm = document.getElementById('logForm');
        if (logForm) {
            logForm.addEventListener('submit', handleAddLog);
            // Set default date
            document.getElementById('logDate').valueAsDate = new Date();
        }

        const editVehicleForm = document.getElementById('editVehicleForm');
        if (editVehicleForm) {
            editVehicleForm.addEventListener('submit', handleEditVehicle);
        }
    }

    setupEventListeners();

    // Mobile Menu Logic
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.getElementById('menuToggle');

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && menuToggle) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Hero CTA buttons
    const startDiagnosisBtn = document.getElementById('startDiagnosis');
    if (startDiagnosisBtn) {
        startDiagnosisBtn.addEventListener('click', () => {
            scrollToSection('diagnostico');
        });
    }

    const learnMoreBtn = document.getElementById('learnMore');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            scrollToSection('diagnostico');
        });
    }

    // Feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const module = e.currentTarget.dataset.module;
            if (module) {
                scrollToSection(module);
            }
        });
    });

    // Chat functionality
    const sendBtn = document.getElementById('sendMessage');
    const chatInput = document.getElementById('chatInput');

    if (sendBtn) {
        sendBtn.addEventListener('click', sendChatMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendChatMessage();
            }
        });

        // Auto-resize textarea
        chatInput.addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
    }

    // Suggestion chips
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            const text = e.target.textContent;
            chatInput.value = text;
            sendChatMessage();
        });
    });

    // Garage Tabs
    document.querySelectorAll('.garage-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.garage-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');

            tab.classList.add('active');
            document.getElementById(`tab-${tab.dataset.tab}`).style.display = 'block';
        });
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// EXPORT FOR TESTING
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateDiagnosticResponse,
        formatMessage,
        state
    };
}
