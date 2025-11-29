// ============================================
// MECÁNICO IA 24/7 - Data & Knowledge Base
// ============================================

// Dashboard Warning Lights Database
const dashboardLights = [
    {
        id: 'check-engine',
        name: 'Check Engine',
        icon: '🔴',
        color: '#EF476F',
        severity: 'high',
        description: 'Problema en el sistema de motor o emisiones',
        causes: [
            'Sensor de oxígeno defectuoso',
            'Catalizador dañado',
            'Bujías en mal estado',
            'Inyectores sucios',
            'Fuga en el sistema de admisión',
            'Sensor MAF defectuoso'
        ],
        actions: [
            'Escanear códigos de error con OBD2',
            'Revisar nivel y estado del aceite',
            'Verificar tapón de gasolina bien cerrado',
            'No ignorar - puede causar daños mayores'
        ],
        urgency: 'Revisar en 1-2 días',
        estimatedCost: '50€ - 800€ según causa'
    },
    {
        id: 'oil-pressure',
        name: 'Presión de Aceite',
        icon: '🛢️',
        color: '#EF476F',
        severity: 'high',
        description: 'Presión de aceite baja - DETENER EL MOTOR',
        causes: [
            'Nivel de aceite bajo',
            'Bomba de aceite defectuosa',
            'Sensor de presión dañado',
            'Fuga de aceite',
            'Aceite muy degradado'
        ],
        actions: [
            '⚠️ DETENER EL MOTOR INMEDIATAMENTE',
            'Verificar nivel de aceite',
            'Buscar fugas visibles',
            'No arrancar hasta revisar',
            'Llamar grúa si es necesario'
        ],
        urgency: '🚨 URGENTE - Detener inmediatamente',
        estimatedCost: '100€ - 1500€'
    },
    {
        id: 'battery',
        name: 'Batería',
        icon: '🔋',
        color: '#FFD23F',
        severity: 'medium',
        description: 'Problema en sistema de carga',
        causes: [
            'Alternador defectuoso',
            'Batería descargada o vieja',
            'Correa del alternador rota',
            'Conexiones sueltas o corroídas',
            'Regulador de voltaje dañado'
        ],
        actions: [
            'Revisar tensión de batería (12.6V apagado)',
            'Verificar voltaje con motor encendido (13.5-14.5V)',
            'Inspeccionar correa del alternador',
            'Limpiar bornes de batería',
            'Evitar usar accesorios innecesarios'
        ],
        urgency: 'Revisar pronto - puede dejarte tirado',
        estimatedCost: '80€ - 500€'
    },
    {
        id: 'abs',
        name: 'ABS',
        icon: '⚠️',
        color: '#FFD23F',
        severity: 'medium',
        description: 'Fallo en sistema antibloqueo de frenos',
        causes: [
            'Sensor ABS sucio o dañado',
            'Fusible fundido',
            'Módulo ABS defectuoso',
            'Cableado dañado',
            'Nivel de líquido de frenos bajo'
        ],
        actions: [
            'Los frenos normales siguen funcionando',
            'Revisar nivel de líquido de frenos',
            'Limpiar sensores de rueda',
            'Escanear códigos de error',
            'Conducir con precaución'
        ],
        urgency: 'Revisar en 1 semana',
        estimatedCost: '100€ - 600€'
    },
    {
        id: 'airbag',
        name: 'Airbag',
        icon: '🎈',
        color: '#EF476F',
        severity: 'high',
        description: 'Sistema de airbag desactivado',
        causes: [
            'Sensor de impacto defectuoso',
            'Cableado bajo asiento suelto',
            'Módulo de airbag dañado',
            'Batería desconectada recientemente',
            'Cinturón de seguridad con fallo'
        ],
        actions: [
            'Revisar conexiones bajo asientos',
            'Verificar fusibles',
            'Escanear códigos de error',
            'No ignorar - seguridad comprometida',
            'Llevar a taller especializado'
        ],
        urgency: 'Revisar urgente - seguridad comprometida',
        estimatedCost: '150€ - 1000€'
    },
    {
        id: 'brake',
        name: 'Frenos',
        icon: '🛑',
        color: '#EF476F',
        severity: 'high',
        description: 'Problema en sistema de frenos',
        causes: [
            'Nivel de líquido bajo',
            'Pastillas de freno gastadas',
            'Fuga en sistema hidráulico',
            'Freno de mano activado',
            'Sensor de desgaste activado'
        ],
        actions: [
            'Verificar nivel de líquido de frenos',
            'Soltar freno de mano',
            'Revisar grosor de pastillas',
            'Buscar fugas',
            'Conducir con extrema precaución'
        ],
        urgency: '🚨 MUY URGENTE',
        estimatedCost: '80€ - 600€'
    },
    {
        id: 'coolant',
        name: 'Temperatura Motor',
        icon: '🌡️',
        color: '#EF476F',
        severity: 'high',
        description: 'Motor sobrecalentado',
        causes: [
            'Nivel de refrigerante bajo',
            'Termostato bloqueado',
            'Ventilador no funciona',
            'Bomba de agua defectuosa',
            'Radiador obstruido',
            'Junta de culata dañada'
        ],
        actions: [
            '⚠️ DETENER EL MOTOR si está en rojo',
            'Dejar enfriar antes de abrir radiador',
            'Revisar nivel de refrigerante',
            'Verificar funcionamiento del ventilador',
            'Buscar fugas visibles'
        ],
        urgency: '🚨 DETENER si temperatura alta',
        estimatedCost: '100€ - 1500€'
    },
    {
        id: 'tire-pressure',
        name: 'Presión Neumáticos',
        icon: '🛞',
        color: '#FFD23F',
        severity: 'medium',
        description: 'Presión incorrecta en neumáticos',
        causes: [
            'Neumático pinchado',
            'Presión baja por temperatura',
            'Sensor TPMS defectuoso',
            'Fuga lenta de aire',
            'Cambio de neumáticos sin resetear'
        ],
        actions: [
            'Revisar presión de todos los neumáticos',
            'Buscar clavos o daños visibles',
            'Inflar a presión recomendada (etiqueta en puerta)',
            'Resetear sistema TPMS si es necesario',
            'Revisar rueda de repuesto también'
        ],
        urgency: 'Revisar hoy mismo',
        estimatedCost: '0€ - 150€'
    },
    {
        id: 'esp',
        name: 'ESP/Control Estabilidad',
        icon: '🔄',
        color: '#FFD23F',
        severity: 'medium',
        description: 'Sistema de estabilidad desactivado',
        causes: [
            'Sistema desactivado manualmente',
            'Sensor de ángulo de dirección',
            'Sensor de velocidad de rueda',
            'Módulo ESP defectuoso',
            'Batería baja'
        ],
        actions: [
            'Verificar si botón ESP está presionado',
            'Apagar y encender el coche',
            'Conducir con precaución en curvas',
            'Escanear códigos de error',
            'Revisar sensores de rueda'
        ],
        urgency: 'Revisar en pocos días',
        estimatedCost: '100€ - 800€'
    },
    {
        id: 'fuel',
        name: 'Combustible Bajo',
        icon: '⛽',
        color: '#FFD23F',
        severity: 'low',
        description: 'Nivel de combustible bajo',
        causes: [
            'Simplemente bajo de combustible',
            'Sensor de nivel defectuoso',
            'Fuga en tanque (si baja muy rápido)'
        ],
        actions: [
            'Repostar lo antes posible',
            'No dejar que llegue a reserva frecuentemente',
            'Puede dañar bomba de combustible',
            'Si consume mucho, revisar inyectores'
        ],
        urgency: 'Repostar pronto',
        estimatedCost: '0€ (solo repostar)'
    },
    {
        id: 'glow-plug',
        name: 'Precalentamiento (Diesel)',
        icon: '🔥',
        color: '#FFD23F',
        severity: 'medium',
        description: 'Problema en bujías de precalentamiento',
        causes: [
            'Bujías de precalentamiento defectuosas',
            'Relé de precalentamiento dañado',
            'Batería débil',
            'Sensor de temperatura motor'
        ],
        actions: [
            'Esperar a que se apague antes de arrancar',
            'Revisar batería',
            'Probar bujías de precalentamiento',
            'Más difícil arrancar en frío',
            'Revisar en taller diesel'
        ],
        urgency: 'Revisar pronto (especialmente en invierno)',
        estimatedCost: '150€ - 500€'
    },
    {
        id: 'dpf',
        name: 'Filtro Partículas (DPF)',
        icon: '💨',
        color: '#FFD23F',
        severity: 'medium',
        description: 'Filtro de partículas obstruido',
        causes: [
            'Uso excesivo en ciudad',
            'Trayectos cortos frecuentes',
            'Filtro saturado de hollín',
            'Sensor de presión diferencial',
            'Aditivo bajo (algunos modelos)'
        ],
        actions: [
            'Hacer trayecto largo en autopista (20-30 min a 2500 rpm)',
            'Permitir regeneración automática',
            'No apagar motor si está regenerando',
            'Usar combustible de calidad',
            'Considerar limpieza profesional si no regenera'
        ],
        urgency: 'Actuar pronto para evitar obstrucción total',
        estimatedCost: '0€ (regeneración) - 1500€ (reemplazo)'
    },
    {
        id: 'washer-fluid',
        name: 'Líquido Limpiaparabrisas',
        icon: '⛲',
        color: '#FFD23F',
        severity: 'low',
        description: 'Nivel bajo de líquido limpiaparabrisas',
        causes: ['Depósito vacío', 'Fuga en el depósito', 'Sensor atascado'],
        actions: ['Rellenar depósito con líquido específico', 'No usar solo agua (se congela/cal)', 'Revisar si hay fugas'],
        urgency: 'Baja',
        estimatedCost: '5€ - 10€'
    },
    {
        id: 'doors',
        name: 'Puerta Abierta',
        icon: '🚪',
        color: '#EF476F',
        severity: 'medium',
        description: 'Alguna puerta o maletero está abierto',
        causes: ['Puerta mal cerrada', 'Sensor de puerta defectuoso', 'Maletero abierto'],
        actions: ['Cerrar bien todas las puertas', 'Revisar maletero y capó', 'Si persiste, revisar sensor'],
        urgency: 'Inmediata (seguridad)',
        estimatedCost: '0€ - 100€'
    },
    {
        id: 'steering',
        name: 'Dirección Asistida',
        icon: '☸️',
        color: '#EF476F',
        severity: 'high',
        description: 'Fallo en dirección asistida',
        causes: ['Falta de líquido hidráulico', 'Bomba de dirección rota', 'Fallo eléctrico (dirección eléctrica)'],
        actions: ['Revisar nivel de líquido', 'El volante estará muy duro', 'Conducir con precaución al taller'],
        urgency: 'Alta - Difícil maniobrar',
        estimatedCost: '100€ - 1200€'
    },
    {
        id: 'brake-pads',
        name: 'Desgaste Pastillas',
        icon: '⭕',
        color: '#FFD23F',
        severity: 'medium',
        description: 'Pastillas de freno desgastadas',
        causes: ['Pastillas llegando al límite', 'Cable del sensor roto', 'Contacto falso'],
        actions: ['Planificar cambio de pastillas', 'No es una emergencia inmediata (tienes unos 1000km)', 'Evitar frenadas bruscas'],
        urgency: 'Media - Planificar taller',
        estimatedCost: '80€ - 200€'
    }
];

// Common Car Problems Database
const commonProblems = {
    noises: [
        {
            sound: 'Chirrido al frenar',
            causes: ['Pastillas de freno gastadas', 'Disco de freno cristalizado', 'Piedras entre pastilla y disco'],
            severity: 'medium',
            solution: 'Revisar grosor de pastillas y estado de discos',
            cost: '150€ - 400€'
        },
        {
            sound: 'Ruido metálico al pasar baches',
            causes: ['Amortiguadores desgastados', 'Bieletas de suspensión', 'Silentblocks rotos'],
            severity: 'medium',
            solution: 'Inspección de suspensión completa',
            cost: '200€ - 800€'
        },
        {
            sound: 'Silbido agudo del motor',
            causes: ['Correa auxiliar desgastada', 'Polea tensora', 'Alternador'],
            severity: 'medium',
            solution: 'Revisar y cambiar correa auxiliar',
            cost: '80€ - 300€'
        },
        {
            sound: 'Golpeteo en el motor',
            causes: ['Nivel de aceite bajo', 'Aceite degradado', 'Taqués hidráulicos', 'Bielas dañadas'],
            severity: 'high',
            solution: 'Revisar aceite urgente, puede ser grave',
            cost: '100€ - 3000€'
        },
        {
            sound: 'Traqueteo al acelerar',
            causes: ['Picado de bielas', 'Combustible de baja calidad', 'Sensor de detonación'],
            severity: 'high',
            solution: 'Usar combustible de mayor octanaje, revisar sensor',
            cost: '50€ - 1500€'
        }
    ],
    vibrations: [
        {
            type: 'Vibración en volante a alta velocidad',
            causes: ['Ruedas desbalanceadas', 'Neumáticos deformados', 'Rodamientos de rueda'],
            solution: 'Balanceo de ruedas y alineación',
            cost: '40€ - 200€'
        },
        {
            type: 'Vibración al frenar',
            causes: ['Discos de freno deformados', 'Pastillas cristalizadas'],
            solution: 'Rectificar o cambiar discos',
            cost: '150€ - 500€'
        },
        {
            type: 'Vibración en ralentí',
            causes: ['Soportes de motor rotos', 'Bujías defectuosas', 'Inyectores sucios'],
            solution: 'Revisar soportes motor y encendido',
            cost: '100€ - 600€'
        }
    ],
    smells: [
        {
            smell: 'Olor a huevos podridos',
            cause: 'Catalizador saturado o defectuoso',
            severity: 'high',
            action: 'Revisar sistema de escape y catalizador',
            cost: '300€ - 1200€'
        },
        {
            smell: 'Olor dulce',
            cause: 'Fuga de refrigerante',
            severity: 'high',
            action: 'Revisar mangueras y radiador',
            cost: '50€ - 500€'
        },
        {
            smell: 'Olor a quemado',
            cause: 'Embrague patinando o frenos sobrecalentados',
            severity: 'medium',
            action: 'Revisar embrague y uso de frenos',
            cost: '400€ - 1200€'
        },
        {
            smell: 'Olor a gasolina',
            cause: 'Fuga en sistema de combustible',
            severity: 'high',
            action: '⚠️ Peligro de incendio - revisar urgente',
            cost: '100€ - 600€'
        }
    ]
};

// Car Comparison Data
const popularModels = {
    'Toyota Corolla': {
        reliability: 9,
        maintenance: 'Bajo',
        fuel: '5.5 L/100km',
        price: '25000€',
        pros: ['Muy fiable', 'Bajo consumo', 'Reventa alta'],
        cons: ['Diseño conservador', 'Menos equipamiento']
    },
    'Volkswagen Golf': {
        reliability: 8,
        maintenance: 'Medio',
        fuel: '6.0 L/100km',
        price: '28000€',
        pros: ['Calidad construcción', 'Tecnología', 'Conducción'],
        cons: ['Mantenimiento caro', 'Depreciación']
    },
    'Seat Leon': {
        reliability: 7,
        maintenance: 'Medio',
        fuel: '5.8 L/100km',
        price: '24000€',
        pros: ['Buen precio', 'Equipamiento', 'Diseño'],
        cons: ['Fiabilidad media', 'Reventa baja']
    },
    'Mazda 3': {
        reliability: 8,
        maintenance: 'Bajo',
        fuel: '5.7 L/100km',
        price: '26000€',
        pros: ['Fiable', 'Diseño premium', 'Conducción divertida'],
        cons: ['Espacio trasero justo', 'Red de talleres']
    },
    'Peugeot 308': {
        reliability: 7,
        maintenance: 'Medio-Alto',
        fuel: '5.9 L/100km',
        price: '27000€',
        pros: ['Confort', 'Diseño interior', 'Tecnología'],
        cons: ['Fiabilidad cuestionable', 'Electrónica compleja']
    }
};

// Maintenance Schedules
const maintenanceSchedule = {
    oil: {
        interval: '15000 km o 1 año',
        cost: '80€ - 150€',
        importance: 'CRÍTICO',
        description: 'Cambio de aceite y filtro'
    },
    filters: {
        air: { interval: '30000 km', cost: '20€ - 40€' },
        cabin: { interval: '20000 km', cost: '15€ - 30€' },
        fuel: { interval: '60000 km', cost: '30€ - 80€' }
    },
    brakes: {
        pads: { interval: '40000-60000 km', cost: '150€ - 400€' },
        discs: { interval: '80000-100000 km', cost: '200€ - 500€' },
        fluid: { interval: '2 años', cost: '40€ - 80€' }
    },
    timing: {
        belt: { interval: '100000-120000 km o 5-6 años', cost: '400€ - 800€', critical: true },
        chain: { interval: 'Vida útil (revisar cada 150000 km)', cost: '800€ - 1500€ si falla' }
    },
    tires: {
        rotation: '10000 km',
        replacement: '40000-60000 km o 5 años',
        cost: '300€ - 800€ (4 neumáticos)'
    },
    battery: {
        life: '4-6 años',
        cost: '80€ - 200€'
    },
    sparkPlugs: {
        interval: '60000-100000 km',
        cost: '80€ - 200€'
    }
};

// Content Templates for Social Media
const contentTemplates = {
    tip: [
        {
            hook: '¿Sabías que...?',
            content: 'cambiar el aceite cada 15.000 km puede alargar la vida de tu motor hasta 100.000 km más',
            cta: 'No lo dejes para mañana'
        },
        {
            hook: '⚠️ Señal de alerta',
            content: 'Si tu coche vibra al frenar, probablemente tengas los discos deformados',
            cta: 'Revísalo antes de que sea peor'
        },
        {
            hook: '💰 Ahorra dinero',
            content: 'Revisar la presión de los neumáticos cada mes puede ahorrarte hasta 200€ al año en combustible',
            cta: 'Solo te lleva 5 minutos'
        }
    ],
    diagnostic: [
        {
            problem: 'Motor pierde potencia',
            diagnosis: 'Filtro de aire sucio o inyectores obstruidos',
            solution: 'Cambio de filtro (20€) o limpieza de inyectores (150€)',
            prevention: 'Usa combustible de calidad'
        },
        {
            problem: 'Humo azul del escape',
            diagnosis: 'Motor quemando aceite - segmentos o retenes',
            solution: 'Reparación motor 1500€-3000€',
            prevention: 'Cambios de aceite regulares'
        }
    ],
    myths: [
        {
            myth: 'Hay que calentar el motor 5 minutos antes de conducir',
            reality: 'FALSO - Los motores modernos se calientan conduciendo suavemente',
            explanation: 'Solo necesitas 30 segundos. Calentar parado gasta combustible y contamina'
        },
        {
            myth: 'La gasolina premium hace que tu coche vaya más rápido',
            reality: 'FALSO - Solo si tu motor lo requiere',
            explanation: 'Si tu manual dice 95, usar 98 no da más potencia, solo gastas más dinero'
        },
        {
            myth: 'Cambiar aceite cada 5.000 km',
            reality: 'INNECESARIO con aceites sintéticos modernos',
            explanation: 'Los aceites actuales aguantan 15.000-20.000 km sin problema'
        }
    ]
};

// Scam Detection Patterns for Used Cars
const scamPatterns = {
    priceAlerts: {
        tooLow: 'Precio 30% por debajo del mercado - ALERTA',
        tooHigh: 'Precio inflado - Negociable',
        fair: 'Precio dentro del rango de mercado'
    },
    redFlags: [
        'Vendedor no permite inspección mecánica',
        'Documentación incompleta o irregular',
        'Kilometraje sospechosamente bajo',
        'Múltiples dueños en poco tiempo',
        'Historial de accidentes oculto',
        'Presión para cerrar trato rápido',
        'Solo acepta efectivo',
        'Matrícula extranjera sin explicación',
        'Fotos genéricas o de stock',
        'No permite prueba de conducción'
    ],
    checkList: [
        'Verificar ITV vigente',
        'Comprobar cargas y embargos (DGT)',
        'Revisar libro de mantenimiento',
        'Inspección pre-compra (100€-150€)',
        'Verificar VIN coincide con documentación',
        'Comprobar que no sea vehículo siniestrado',
        'Revisar estado real de neumáticos y frenos',
        'Escanear códigos de error OBD2'
    ]
};

// Export all data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        dashboardLights,
        commonProblems,
        popularModels,
        maintenanceSchedule,
        contentTemplates,
        scamPatterns
    };
}
