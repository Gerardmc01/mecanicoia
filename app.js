// ============================================
// MECÁNICO IA 24/7 - Main Application Logic
// ============================================

// State Management
const state = {
    currentModule: 'inicio',
    chatHistory: JSON.parse(localStorage.getItem('chatHistory')) || [],
    userVehicles: JSON.parse(localStorage.getItem('userVehicles')) || [],
    favorites: JSON.parse(localStorage.getItem('favorites')) || []
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupScrollEffects();
    loadDashboardLights();
    loadUserVehicles();
    loadChatHistory(); // Load saved messages

    // Event Listeners
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendChatMessage();
        });
    }

    // Modal Closers
    window.onclick = (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    };

    // Add Vehicle Form
    const addVehicleForm = document.getElementById('addVehicleForm');
    if (addVehicleForm) {
        addVehicleForm.addEventListener('submit', handleAddVehicle);
    }

    // Edit Vehicle Form
    const editVehicleForm = document.getElementById('editVehicleForm');
    if (editVehicleForm) {
        editVehicleForm.addEventListener('submit', handleEditVehicle);
    }

    // Add Log Form
    const logForm = document.getElementById('logForm');
    if (logForm) {
        logForm.addEventListener('submit', handleAddLog);
    }
});

function initializeApp() {
    console.log('🔧 Mecánico IA 24/7 initialized');

    // Add initial assistant message
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages && chatMessages.children.length === 1) {
        // Already has initial message from HTML
    }
}

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

function loadChatHistory() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;

    // Clear default messages if we have history
    if (state.chatHistory.length > 0) {
        // Keep the first welcome message if it exists, or clear all
        // Ideally we want to render the history
        chatMessages.innerHTML = '';

        // Add initial welcome if history is empty (but here it's not)
        // or just render history
        state.chatHistory.forEach(msg => {
            addChatMessage(msg.content, msg.role, false); // false = don't scroll yet
        });

        // Scroll to bottom after loading
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Hide suggestions if we have history
        const suggestions = document.getElementById('chatSuggestions');
        if (suggestions) suggestions.style.display = 'none';
    }
}

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
    if (suggestions) {
        suggestions.style.display = 'none';
    }

    // Save to history state
    const userMsgObj = { role: 'user', content: message };
    state.chatHistory.push(userMsgObj);
    localStorage.setItem('chatHistory', JSON.stringify(state.chatHistory));

    // Show typing indicator
    const typingIndicator = addTypingIndicator();

    try {
        // CONFIGURACIÓN: Cambia esta URL por la de tu Cloudflare Worker
        // Ejemplo: 'https://mecanico-ia-api.TU-USUARIO.workers.dev'
        const API_URL = 'https://mecanico-ia-api.YOUR-SUBDOMAIN.workers.dev';

        // Si la URL aún no está configurada, usar fallback local
        if (API_URL.includes('YOUR-SUBDOMAIN')) {
            console.warn('⚠️ API URL no configurada. Usando IA local de respaldo.');
            setTimeout(() => {
                typingIndicator.remove();
                const response = generateDiagnosticResponse(message);
                addChatMessage(response, 'assistant');
                state.chatHistory.push({ role: 'assistant', content: response });
                localStorage.setItem('chatHistory', JSON.stringify(state.chatHistory));
            }, 1500);
            return;
        }

        // Llamar a la API de Gemini a través del Worker
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                history: state.chatHistory.slice(0, -1) // Enviar historial sin el mensaje actual
            })
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const data = await response.json();
        typingIndicator.remove();

        const aiResponse = data.response;
        addChatMessage(aiResponse, 'assistant');

        // Save assistant response
        state.chatHistory.push({ role: 'assistant', content: aiResponse });
        localStorage.setItem('chatHistory', JSON.stringify(state.chatHistory));

    } catch (error) {
        console.error('Error al conectar con la IA:', error);
        typingIndicator.remove();

        // Fallback a IA local si falla la API
        const fallbackResponse = generateDiagnosticResponse(message);
        addChatMessage(fallbackResponse, 'assistant');
        state.chatHistory.push({ role: 'assistant', content: fallbackResponse });
        localStorage.setItem('chatHistory', JSON.stringify(state.chatHistory));

        // Mostrar aviso al usuario
        addChatMessage(
            '⚠️ *Nota: Estoy funcionando en modo offline. Para diagnósticos más precisos, verifica la conexión.*',
            'assistant'
        );
    }
}

function addChatMessage(text, role, shouldScroll = true) {
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

    if (shouldScroll) {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
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

    // 1. GREETINGS & GENERAL
    if (lowerMessage.match(/hola|buenos dias|buenas|hey/)) {
        return `👋 **¡Hola! Soy tu Mecánico IA.**
        
Estoy listo para ayudarte a diagnosticar problemas en tu coche. Cuéntame qué síntomas notas.
Por ejemplo:
- "Escucho un chirrido al frenar"
- "El coche no arranca pero las luces encienden"
- "Sale humo blanco del escape"
- "Vibra el volante a 100 km/h"`;
    }

    // 2. STARTING ISSUES
    if (lowerMessage.includes('arranca') || lowerMessage.includes('encender')) {
        if (lowerMessage.includes('no') && (lowerMessage.includes('luces') || lowerMessage.includes('bateria'))) {
            return `🔍 **Diagnóstico: Problema de Arranque**

**Síntoma:** El coche no arranca pero hay luces/batería.

**Causas probables:**
1. **Motor de arranque** (60%): Si oyes un "clic" pero no gira.
2. **Batería débil** (30%): Tiene carga para luces pero no para mover el motor.
3. **Inmovilizador** (10%): Fallo en la llave o sistema de seguridad.

**Prueba rápida:** Intenta encender las luces largas y arrancar. Si las luces se apagan del todo, es batería. Si no bajan de intensidad, es motor de arranque.`;
        }
        return `🔍 **Diagnóstico: El coche no arranca**

Para afinar, dime:
1. ¿Hace algún ruido al girar la llave (clic, intento de giro, silencio total)?
2. ¿Funcionan las luces del cuadro?
3. ¿Fue de repente o ya fallaba antes?`;
    }

    // 3. BRAKES (NOISE)
    if (lowerMessage.includes('freno') || lowerMessage.includes('frenar')) {
        if (lowerMessage.includes('ruido') || lowerMessage.includes('chirrido')) {
            return `🔍 **Diagnóstico: Ruido al frenar**

**Causas más probables:**
1. **Pastillas de freno gastadas** (70%): El testigo metálico roza el disco.
2. **Discos cristalizados** (20%): Por sobrecalentamiento.
3. **Suciedad/Piedras** (10%): Entre pastilla y disco.

**Gravedad:** ⚠️ MEDIA. Si es metal contra metal, urge cambiarlo.
**Coste estimado:** 120€ - 250€ (eje delantero).`;
        }
        if (lowerMessage.includes('vibra')) {
            return `🔍 **Diagnóstico: Vibración al frenar**

**Causa principal:** **Discos de freno alabeados (deformados)**.
Esto ocurre por cambios bruscos de temperatura (ej. lavar coche con frenos calientes).

**Solución:** Cambiar discos y pastillas delanteros.
**Coste:** 200€ - 400€.`;
        }
    }

    // 4. SMOKE COLORS
    if (lowerMessage.includes('humo')) {
        if (lowerMessage.includes('blanco')) return `☁️ **Humo Blanco:**
- **En frío:** Condensación normal (vapor de agua). Desaparece al calentar.
- **En caliente:** ⚠️ **Junta de culata** o rotura de bloque (consume refrigerante). ¡Grave! Revisa el nivel de agua.`;

        if (lowerMessage.includes('negro')) return `☁️ **Humo Negro:**
- **Diésel:** Mala combustión, inyectores sucios o filtro de aire taponado.
- **Gasolina:** Mezcla muy rica (demasiada gasolina). Sonda lambda o inyectores.`;

        if (lowerMessage.includes('azul')) return `☁️ **Humo Azulado:**
- ⚠️ **Consumo de aceite**. El motor está quemando aceite.
- Causas: Segmentos gastados, guías de válvula o turbo roto.
- Revisa el nivel de aceite urgentemente.`;

        return `☁️ **Diagnóstico de Humo:** ¿De qué color es el humo? (Blanco, Negro, Azul)`;
    }

    // 5. VIBRATIONS
    if (lowerMessage.includes('vibra') || lowerMessage.includes('temblor')) {
        if (lowerMessage.includes('volante')) return `📳 **Vibración en el Volante:**
- **A 80-120 km/h:** Ruedas desequilibradas (necesitas equilibrado).
- **Al frenar:** Discos de freno deformados.
- **Siempre:** Llanta golpeada o deformada.`;

        if (lowerMessage.includes('ralenti') || lowerMessage.includes('parado')) return `📳 **Vibración al ralentí (parado):**
- **Tacos de motor:** Los soportes de goma están rotos y transmiten la vibración del motor al chasis.
- **Fallo de cilindro:** El motor "cojea" (bujía o inyector mal).`;
    }

    // 6. AIR CONDITIONING
    if (lowerMessage.includes('aire') || lowerMessage.includes('clima')) {
        if (lowerMessage.includes('no enfria') || lowerMessage.includes('caliente')) return `❄️ **Aire Acondicionado no enfría:**
1. **Falta de gas:** Necesita una recarga (y buscar fugas). (~50€-80€)
2. **Compresor no arranca:** Fusible, relé o el propio compresor roto.
3. **Filtro habitáculo sucio:** Poco caudal de aire.`;
    }

    // 7. BATTERY & ELECTRIC
    if (lowerMessage.includes('bateria') || lowerMessage.includes('alternador')) {
        return `🔋 **Problemas Eléctricos:**
- **Batería:** Vida útil media 4-5 años. Si tiene más, cámbiala.
- **Alternador:** Si se enciende la luz de batería CON el motor en marcha, el alternador no carga.`;
    }

    // 8. GENERIC NOISE
    if (lowerMessage.includes('ruido') || lowerMessage.includes('sonido')) {
        if (lowerMessage.includes('motor')) return `🔊 **Ruido en Motor:**
- **Tic-tic-tic (rápido):** Taqués hidráulicos o válvulas (falta aceite o desajuste).
- **Correa chillando:** Correa de accesorios patinando (vieja o destensada).
- **Golpeteo profundo:** ⚠️ Biela o cigüeñal. Muy grave. Parar motor.`;

        if (lowerMessage.includes('rueda') || lowerMessage.includes('rodamiento')) return `🔊 **Ruido en Ruedas:**
- **Zumbido que aumenta con velocidad:** Rodamiento de rueda roto (buje). Cambia al girar el volante.`;
    }

    // DEFAULT FALLBACK
    return `🤔 **Necesito más detalles para ayudarte.**

No estoy seguro de qué problema es con esa descripción. Intenta decirme:
1. **¿Qué síntoma notas?** (Ruido, humo, no arranca, luz encendida...)
2. **¿Cuándo pasa?** (En frío, al frenar, a alta velocidad...)
3. **¿Dónde?** (Motor, ruedas, escape...)

*Ejemplo: "El coche vibra mucho cuando voy a 120 km/h"*`;
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
    const hood = document.getElementById('carHood');
    if (hood) hood.classList.remove('open');

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
            year: parseInt(year),
            mileage: parseInt(mileage),
            type
        };

        localStorage.setItem('userVehicles', JSON.stringify(state.userVehicles));

        closeModal('editVehicleModal');

        loadUserVehicles();

        // Force reload dashboard with updated data
        loadVehicleDashboard(id);
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
window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
};

window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
};

window.toggleMaintenance = function (el) {
    el.classList.toggle('checked');
};

window.sendChatMessage = sendChatMessage;
window.showSuggestion = function (text) {
    const chatInput = document.getElementById('chatInput');
    chatInput.value = text;
    sendChatMessage();
};
window.openEditVehicleModal = openEditVehicleModal;
window.handleDeleteVehicle = handleDeleteVehicle;

// Clear chat history function
window.clearChatHistory = function () {
    if (confirm('¿Estás seguro de que quieres borrar todo el historial del chat?')) {
        state.chatHistory = [];
        localStorage.removeItem('chatHistory');

        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = `
            <div class="message assistant-message">
                <div class="message-avatar">🔧</div>
                <div class="message-content">
                    <div class="message-text">
                        ¡Hola! Soy tu Mecánico IA. Cuéntame qué problema tiene tu coche: ruidos extraños,
                        pérdida de potencia, vibraciones, humo, olores... Lo que sea. Cuanto más detalles me des,
                        mejor podré ayudarte.
                    </div>
                </div>
            </div>
        `;

        // Show suggestions again
        const suggestions = document.getElementById('chatSuggestions');
        if (suggestions) suggestions.style.display = 'flex';
    }
};

