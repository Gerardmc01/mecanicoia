const fs = require('fs');
const path = require('path');

// PLANTILLA HTML OPTIMIZADA PARA SEO
const template = (post) => `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.seoTitle} | Blog Mecánico IA</title>
    <meta name="description" content="${post.metaDescription}">
    <meta name="keywords" content="${post.keywords}">
    <meta name="author" content="Mecánico IA 24/7">
    <link rel="canonical" href="https://mecanicoia.com/blog/${post.slug}.html">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔧</text></svg>">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${post.seoTitle}">
    <meta property="og:description" content="${post.metaDescription}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://mecanicoia.com/blog/${post.slug}.html">
    
    <!-- Estilos -->
    <link rel="stylesheet" href="../styles.css">
    <link rel="stylesheet" href="../garage-styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        .blog-post-content {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem 1rem;
            font-family: 'Inter', sans-serif;
            color: var(--text-primary);
        }
        .blog-header {
            text-align: center;
            margin-bottom: 3rem;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--border);
        }
        .blog-meta {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }
        .blog-title {
            font-size: 2.5rem;
            background: linear-gradient(135deg, #fff 0%, #a5b4fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
        }
        .blog-body h2 {
            color: var(--primary);
            margin-top: 2.5rem;
            font-size: 1.8rem;
            border-left: 4px solid var(--primary);
            padding-left: 1rem;
        }
        .blog-body h3 {
            color: #fff;
            margin-top: 2rem;
            font-size: 1.4rem;
        }
        .blog-body p {
            line-height: 1.8;
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
            color: #d1d5db;
        }
        .blog-body ul {
            background: rgba(255,255,255,0.05);
            padding: 2rem 3rem;
            border-radius: 1rem;
            margin-bottom: 2rem;
        }
        .blog-body li {
            margin-bottom: 0.8rem;
            color: #e5e7eb;
        }
        .cta-box {
            background: linear-gradient(135deg, rgba(46, 213, 115, 0.1) 0%, rgba(31, 163, 90, 0.1) 100%);
            border: 1px solid var(--primary);
            border-radius: 1rem;
            padding: 2rem;
            text-align: center;
            margin: 3rem 0;
        }
        .breadcrumb {
            color: var(--text-secondary);
            margin-bottom: 2rem;
        }
        .breadcrumb a {
            color: var(--primary);
            text-decoration: none;
        }
    </style>
</head>
<body>
    <!-- Nav (Simplificada) -->
    <nav class="navbar" style="position: relative;">
        <div class="container nav-container">
            <div class="logo">
                <a href="../index.html" style="text-decoration: none; color: white;">
                    <span class="logo-icon">🔧</span> Mecánico IA
                </a>
            </div>
            <a href="../index.html#diagnostico" class="btn btn-primary">Diagnosticar Ahora</a>
        </div>
    </nav>

    <article class="blog-post-content">
        <div class="breadcrumb">
            <a href="../index.html">Inicio</a> > <a href="../blog.html">Blog</a> > <span>${post.title}</span>
        </div>

        <header class="blog-header">
            <div class="blog-meta">
                📅 ${new Date().toLocaleDateString()} | ⏱️ 5 min lectura | ✍️ Por Mecánico IA
            </div>
            <h1 class="blog-title">${post.title}</h1>
            <p class="lead" style="font-size: 1.2rem; color: var(--text-secondary);">${post.metaDescription}</p>
        </header>

        <div class="blog-body">
            ${post.content}
        </div>

        <div class="cta-box">
            <h2>¿Tu coche tiene estos síntomas?</h2>
            <p>No adivines. Usa nuestra Inteligencia Artificial para obtener un diagnóstico preciso, costes estimados y pasos de reparación.</p>
            <a href="../index.html#diagnostico" class="btn btn-primary" style="display: inline-block; margin-top: 1rem; font-size: 1.2rem; padding: 1rem 2rem;">
                🤖 Diagnosticar mi Coche Gratis
            </a>
        </div>
    </article>

    <footer style="text-align: center; padding: 2rem; color: var(--text-secondary); border-top: 1px solid var(--border);">
        <p>© 2025 Mecánico IA 24/7. Todos los derechos reservados.</p>
    </footer>
</body>
</html>`;

// DATOS DE LOS 20 ARTÍCULOS (SEO PURO)
const posts = [
    {
        slug: 'testigos-tablero-significado',
        title: 'Guía Definitiva de Testigos del Tablero: ¿Qué significa cada luz?',
        seoTitle: 'Significado Testigos Luminosos Coche: Guía Completa 2025',
        metaDescription: '¿Se ha encendido una luz en tu coche? Descubre el significado de todos los testigos del tablero: Check Engine, Aceite, Batería y más. Evita averías graves.',
        keywords: 'testigos coche, luces tablero significado, check engine, luz avería motor, testigos luminosos coche',
        content: `
            <p>Los testigos luminosos del tablero son la forma que tiene tu coche de comunicarse contigo. Ignorarlos puede convertir una pequeña avería de 50€ en una catástrofe de 2.000€. En esta guía analizamos los más importantes.</p>
            
            <h2>🔴 Testigos Rojos: ¡PARA INMEDIATAMENTE!</h2>
            <p>Si ves una luz roja, la seguridad del vehículo o de los pasajeros está en riesgo. Detén el coche en cuanto sea seguro.</p>
            <ul>
                <li><strong>Presión de Aceite:</strong> Falta de lubricación. Si sigues, griparás el motor.</li>
                <li><strong>Temperatura:</strong> El motor se está sobrecalentando. Riesgo de quemar la junta de culata.</li>
                <li><strong>Frenos:</strong> Nivel bajo de líquido o fallo en el sistema de frenado.</li>
                <li><strong>Batería:</strong> El alternador no carga. El coche se apagará pronto.</li>
            </ul>

            <h2>🟡 Testigos Amarillos: Precaución</h2>
            <p>Puedes continuar la marcha, pero debes ir al taller lo antes posible.</p>
            <ul>
                <li><strong>Check Engine (Fallo Motor):</strong> Problema en inyección, encendido o emisiones.</li>
                <li><strong>ABS/ESP:</strong> Los sistemas de seguridad activa no funcionan, pero tienes frenos normales.</li>
                <li><strong>Presión Neumáticos:</strong> Una rueda está pinchada o baja de presión.</li>
            </ul>

            <h2>¿Qué hacer si se enciende el Check Engine?</h2>
            <p>Esta es la luz más temida y ambigua. Puede ser desde un tapón de gasolina mal cerrado hasta un fallo en el catalizador. Lo mejor es usar nuestro <strong>Diagnóstico IA</strong> para identificar los síntomas exactos antes de ir al taller.</p>
        `
    },
    {
        slug: 'coche-no-arranca',
        title: 'Mi Coche No Arranca: 5 Causas Más Comunes y Soluciones',
        seoTitle: 'Coche No Arranca: Causas y Soluciones Rápidas',
        metaDescription: '¿Tu coche no arranca? Te explicamos las 5 causas más probables: batería, motor de arranque, alternador, combustible o inmovilizador. Diagnóstico rápido.',
        keywords: 'coche no arranca, fallo arranque, bateria descargada, motor arranque, coche hace clic no arranca',
        content: `
            <p>Giras la llave y... nada. O peor, un sonido agónico. Que el coche no arranque es una de las situaciones más frustrantes. Aquí tienes el diagnóstico paso a paso.</p>

            <h2>1. Batería Descargada (El 80% de los casos)</h2>
            <p><strong>Síntomas:</strong> Al girar la llave, las luces del tablero parpadean o están tenues. El motor hace un sonido muy lento o nulo.</p>
            <p><strong>Solución:</strong> Pinzas, arrancador portátil o cambiar la batería.</p>

            <h2>2. Motor de Arranque</h2>
            <p><strong>Síntomas:</strong> Las luces tienen potencia, la batería está bien, pero al girar la llave se oye un "CLIC" seco y metálico, y el motor no gira.</p>
            <p><strong>Solución:</strong> A veces un golpe seco al motor de arranque funciona temporalmente, pero toca cambiarlo.</p>

            <h2>3. Alternador</h2>
            <p><strong>Síntomas:</strong> El coche se paró en marcha o la batería se descarga constantemente aunque sea nueva.</p>

            <h2>4. Inmovilizador / Llave</h2>
            <p><strong>Síntomas:</strong> El motor gira bien pero no "prende". Suele aparecer un testigo de una llave o candado en el tablero.</p>

            <h2>5. Falta de Combustible o Bomba</h2>
            <p>Parece obvio, pero a veces el aforador falla y marca gasolina cuando no hay. Si la bomba no suena al poner el contacto, puede estar quemada.</p>
        `
    },
    {
        slug: 'ruidos-frenos-chirridos',
        title: '¿Por qué chirrían los frenos? Causas y Soluciones',
        seoTitle: 'Ruido al Frenar: Por qué chirrían los frenos y coste reparación',
        metaDescription: 'El chirrido de frenos es molesto y puede ser peligroso. Descubre si son pastillas gastadas, cristalizadas o suciedad. Precios y soluciones.',
        keywords: 'ruido frenos, chirrido frenos coche, pastillas freno gastadas, frenos cristalizados',
        content: `
            <p>Ese sonido agudo al frenar no solo es molesto, es un aviso. Aquí te explicamos por qué tus frenos "cantan".</p>

            <h2>1. Pastillas Gastadas (El aviso acústico)</h2>
            <p>Muchas pastillas tienen una chapa metálica diseñada para rozar con el disco cuando queda poco material, avisándote de que toca cambio.</p>

            <h2>2. Cristalización</h2>
            <p>Si has frenado muy fuerte o abusado de los frenos, la superficie de la pastilla se "cristaliza" (se endurece y pierde fricción), provocando ruidos y peor frenada.</p>

            <h2>3. Suciedad o Humedad</h2>
            <p>A veces es solo polvo acumulado. Un lavado a presión en la zona de las ruedas puede solucionarlo.</p>

            <h2>¿Cuánto cuesta arreglarlo?</h2>
            <p>Un cambio de pastillas suele rondar los 80€ - 150€, mientras que si has dañado los discos, la factura subirá a 200€ - 400€.</p>
        `
    },
    {
        slug: 'humo-blanco-azul-negro',
        title: 'El Color del Humo: Diagnóstico por el Escape',
        seoTitle: 'Significado Humo Escape: Blanco, Azul o Negro',
        metaDescription: 'Dime de qué color es el humo de tu coche y te diré qué avería tienes. Guía completa de humo blanco, azul y negro en diesel y gasolina.',
        keywords: 'humo blanco escape, humo azul coche, humo negro diesel, averia humo escape',
        content: `
            <p>El tubo de escape es el termómetro de la salud interna de tu motor. El color del humo te dice exactamente qué está quemando tu coche indebidamente.</p>

            <h2>⚪ Humo Blanco</h2>
            <ul>
                <li><strong>En frío y desaparece:</strong> Condensación normal. No es avería.</li>
                <li><strong>Denso y persistente (con olor dulce):</strong> Estás quemando <strong>refrigerante</strong>. Síntoma claro de <strong>Junta de Culata</strong> rota. ¡Peligro grave!</li>
                <li><strong>En Diesel al arrancar:</strong> Problema de inyección o calentadores.</li>
            </ul>

            <h2>🔵 Humo Azul</h2>
            <p>Significa que el motor está quemando <strong>ACEITE</strong>. Puede ser por:</p>
            <ul>
                <li>Segmentos del pistón gastados.</li>
                <li>Retenes de válvulas viejos.</li>
                <li>Turbo con holgura (el aceite pasa a la admisión).</li>
            </ul>

            <h2>⚫ Humo Negro</h2>
            <p>Exceso de combustible o falta de aire (mezcla rica). Muy común en Diesel.</p>
            <ul>
                <li>Inyectores sucios o goteando.</li>
                <li>Filtro de aire obstruido.</li>
                <li>Válvula EGR atascada abierta.</li>
            </ul>
        `
    },
    {
        slug: 'vibracion-volante-causas',
        title: '¿Por qué vibra el volante? 5 Causas Principales',
        seoTitle: 'Vibración Volante: Causas a 100km/h y al frenar',
        metaDescription: 'Si tu volante vibra a cierta velocidad o al frenar, tienes un problema. Analizamos equilibrado, alineación, discos alabeados y más.',
        keywords: 'vibracion volante, coche vibra 120, volante vibra al frenar, equilibrado ruedas',
        content: `
            <p>La vibración en el volante no es normal y fatiga al conductor, además de desgastar el coche. El tipo de vibración nos dice la causa.</p>

            <h2>1. Vibra a cierta velocidad (ej. 100-120 km/h)</h2>
            <p>Casi seguro es un problema de <strong>Equilibrado de Neumáticos</strong>. Se ha caído un plomo de la llanta. Reparación barata (10€-20€).</p>

            <h2>2. Vibra al frenar</h2>
            <p>Tienes los <strong>Discos de Freno Alabeados</strong> (deformados). Ocurre por sobrecalentamiento. Toca cambiar discos y pastillas.</p>

            <h2>3. Vibra al acelerar</h2>
            <p>Puede ser un problema en las <strong>Transmisiones (Palieres)</strong> o en los soportes del motor (tacos).</p>

            <h2>4. Vibración constante y desgaste irregular</h2>
            <p>Necesitas una <strong>Alineación (Paralelo)</strong>. La dirección no pisa recta.</p>
        `
    },
    {
        slug: 'aire-acondicionado-no-enfria',
        title: 'El Aire Acondicionado No Enfría: ¿Fuga o Compresor?',
        seoTitle: 'Aire Acondicionado Coche No Enfría: Causas y Carga',
        metaDescription: '¿Tu coche no enfría? Descubre si es falta de gas, fuga, filtro sucio o fallo del compresor. Precios de recarga y reparación.',
        keywords: 'aire acondicionado coche no enfria, carga gas aire acondicionado, compresor aire acondicionado',
        content: `
            <p>Llega el calor y el aire sale templado. ¿Qué pasa?</p>
            <h2>1. Falta de Gas (Lo más común)</h2>
            <p>Los circuitos pierden una pequeña cantidad de gas con los años. Una recarga (50€-80€) suele solucionarlo. Si se vacía en semanas, tienes una fuga.</p>
            <h2>2. Filtro de Habitáculo Sucio</h2>
            <p>Si el aire enfría pero sale con <strong>poca fuerza</strong>, el filtro de polen está obstruido. Cámbialo tú mismo por 15€.</p>
            <h2>3. Compresor o Condensador</h2>
            <p>Si tienes gas pero no enfría nada y no oyes el "clic" del compresor al encenderlo, puede ser una avería eléctrica o del propio compresor (300€+).</p>
        `
    },
    {
        slug: 'coche-pierde-potencia',
        title: 'Mi Coche Pierde Potencia: Causas y Soluciones',
        seoTitle: 'Pérdida Potencia Coche: Turbo, Caudalímetro y Modo Emergencia',
        metaDescription: '¿Tu coche no acelera como antes o entra en modo protección? Analizamos caudalímetro, turbo, EGR y filtros obstruidos.',
        keywords: 'coche pierde potencia, modo emergencia coche, fallo turbo, limpiar caudalimetro',
        content: `
            <p>Pisas el acelerador y el coche no responde. A veces se enciende un testigo y el coche no pasa de 2.000 rpm (Modo Emergencia).</p>
            <h2>1. Caudalímetro (Sensor MAF)</h2>
            <p>Mide el aire que entra. Si falla, la centralita no sabe cuánto combustible inyectar. Síntoma: Pérdida progresiva de fuerza.</p>
            <h2>2. Turbo y Manguitos</h2>
            <p>Si oyes un silbido fuerte (como una aspiradora) al acelerar, tienes un manguito del turbo rajado. Pierdes presión y potencia.</p>
            <h2>3. Válvula EGR</h2>
            <p>Si se queda abierta por carbonilla, mete demasiados gases de escape al motor, ahogándolo.</p>
        `
    },
    {
        slug: 'bateria-o-alternador',
        title: '¿Batería o Alternador? Cómo saber qué falla',
        seoTitle: 'Diferencia fallo Batería y Alternador: Diagnóstico',
        metaDescription: '¿El coche no arranca? Aprende a distinguir si debes cambiar la batería o reparar el alternador con estas pruebas sencillas.',
        keywords: 'fallo bateria o alternador, comprobar alternador coche, sintomas bateria gastada',
        content: `
            <p>Es la duda eterna. Aquí tienes la prueba definitiva:</p>
            <h3>La Prueba de las Luces</h3>
            <ol>
                <li>Arranca el coche (con pinzas si hace falta).</li>
                <li>Enciende las luces cortas frente a una pared.</li>
                <li>Acelera el motor.</li>
            </ol>
            <p><strong>Resultado A:</strong> Las luces aumentan de intensidad al acelerar. -> <strong>Alternador OK</strong>, la batería está muerta.</p>
            <p><strong>Resultado B:</strong> Las luces no cambian o se apagan poco a poco con el motor en marcha. -> <strong>Alternador ROTO</strong>, no está cargando.</p>
        `
    },
    {
        slug: 'junta-culata-sintomas',
        title: 'Junta de Culata: Síntomas de la avería más temida',
        seoTitle: 'Síntomas Junta de Culata Rota y Precio Reparación',
        metaDescription: 'Humo blanco, mayonesa en el aceite, sobrecalentamiento... Detecta a tiempo la rotura de junta de culata para salvar tu motor.',
        keywords: 'junta culata sintomas, precio junta culata, aceite con agua coche, coche se calienta',
        content: `
            <p>La junta de culata sella la parte superior e inferior del motor. Si falla, se mezclan aceite, refrigerante y compresión. Es grave.</p>
            <h2>Síntomas Inconfundibles</h2>
            <ul>
                <li><strong>Sobrecalentamiento rápido:</strong> La aguja sube al rojo en minutos.</li>
                <li><strong>Mayonesa en el tapón del aceite:</strong> Una pasta blanca/amarilla que indica mezcla de agua y aceite.</li>
                <li><strong>Humo blanco denso:</strong> Vapor de agua saliendo por el escape.</li>
                <li><strong>Presión en manguitos:</strong> Los tubos del radiador se ponen duros como piedras.</li>
            </ul>
        `
    },
    {
        slug: 'correa-distribucion-cuando-cambiar',
        title: 'Correa de Distribución: Cuándo cambiarla y riesgos',
        seoTitle: 'Cuándo cambiar Correa Distribución: Kilómetros y Años',
        metaDescription: 'No te la juegues. Te decimos cuándo cambiar la correa de distribución y qué pasa si se rompe (spoiler: motor nuevo).',
        keywords: 'cambio correa distribucion, precio correa distribucion, cuando cambiar distribucion',
        content: `
            <p>Es el mantenimiento más crítico. Si la correa se rompe, los pistones chocarán contra las válvulas y destrozarán el motor.</p>
            <h2>¿Cuándo cambiarla?</h2>
            <p>Lo que diga el fabricante, pero como norma general:</p>
            <ul>
                <li>Entre <strong>80.000 y 120.000 km</strong>.</li>
                <li>O cada <strong>5 - 7 años</strong> (la goma caduca aunque no uses el coche).</li>
            </ul>
            <h2>¿Cadena o Correa?</h2>
            <p>Si tu coche lleva cadena, en teoría es "de por vida", aunque requieren revisión a partir de los 200.000 km si suenan.</p>
        `
    },
    {
        slug: 'embrague-gastado-sintomas',
        title: '5 Señales de que tu Embrague está muriendo',
        seoTitle: 'Síntomas Embrague Gastado: Cómo saber si patina',
        metaDescription: '¿El coche se revoluciona pero no corre? ¿Huele a quemado? Aprende a detectar un embrague gastado antes de quedarte tirado.',
        keywords: 'embrague patina sintomas, cambiar embrague precio, prueba embrague',
        content: `
            <p>El embrague es una pieza de desgaste. Aquí tienes cómo saber si le queda poca vida:</p>
            <h2>1. El coche patina</h2>
            <p>Aceleras a fondo en una marcha larga (4ª o 5ª), las revoluciones suben, pero la velocidad no aumenta. El disco resbala.</p>
            <h2>2. El pedal está muy alto</h2>
            <p>El embrague solo "engancha" al final del recorrido del pedal.</p>
            <h2>3. Olor a quemado</h2>
            <p>Un olor acre característico al arrancar en cuesta o maniobrar.</p>
            <h2>La Prueba del Freno de Mano</h2>
            <p>Pon el freno de mano, mete 3ª e intenta salir soltando el embrague poco a poco. Si el coche se cala inmediatamente, el embrague está bien. Si tarda en calarse o no se cala, está muerto.</p>
        `
    },
    {
        slug: 'filtro-particulas-diesel-limpieza',
        title: 'Filtro de Partículas (DPF) Obstruido: Soluciones',
        seoTitle: 'Limpiar Filtro Partículas Diesel: Regeneración y Averías',
        metaDescription: '¿Testigo DPF encendido? Te explicamos cómo forzar una regeneración del filtro de partículas y evitar averías de 1000€.',
        keywords: 'filtro particulas obstruido, limpiar fap diesel, regeneracion filtro particulas',
        content: `
            <p>La pesadilla de los diesel modernos en ciudad. El hollín obstruye el filtro.</p>
            <h2>Cómo hacer una Regeneración Forzada (Gratis)</h2>
            <p>Si se enciende el testigo, sal a autovía:</p>
            <ol>
                <li>Conduce durante 20-30 minutos.</li>
                <li>Mantén el motor por encima de <strong>2.500 - 3.000 rpm</strong> (usa una marcha más corta, ej. 4ª a 120km/h).</li>
                <li>Esto eleva la temperatura del escape y quema el hollín.</li>
            </ol>
            <p>Si esto no funciona, necesitarás una limpieza química en taller (200€) o cambiarlo (1000€+).</p>
        `
    },
    {
        slug: 'liquido-refrigerante-baja-nivel',
        title: '¿Por qué baja el nivel de refrigerante?',
        seoTitle: 'Coche consume refrigerante: Causas y Fugas',
        metaDescription: 'Si tienes que rellenar el anticongelante a menudo, tienes un problema. Analizamos fugas visibles y consumos internos.',
        keywords: 'coche pierde refrigerante, nivel anticongelante bajo, fuga radiador',
        content: `
            <p>El circuito de refrigeración es hermético. Si baja el nivel, es que sale por algún lado.</p>
            <h2>1. Fuga Externa (Visible)</h2>
            <p>Busca manchas de color (rosa/verde) en el suelo o marcas secas blancas en el radiador, manguitos o bomba de agua.</p>
            <h2>2. Fuga Interna (Invisible y Peligrosa)</h2>
            <p>Si no hay manchas fuera, el motor se lo está "bebiendo". Puede pasar al aceite (mayonesa) o a los cilindros (humo blanco). Culpa de la junta de culata o enfriador EGR.</p>
        `
    },
    {
        slug: 'ruido-motor-taca-taca',
        title: 'Ruidos en el Motor: ¿Qué significa ese "Taca Taca"?',
        seoTitle: 'Identificar Ruidos Motor: Taqués, Bielas y Correas',
        metaDescription: 'Guía de sonidos del motor. Diferencia entre ruido de taqués, biela, correas o turbo y su gravedad.',
        keywords: 'ruido motor taca taca, sonido taques hidraulicos, ruido biela motor',
        content: `
            <p>El motor te habla. Aprende su idioma:</p>
            <ul>
                <li><strong>Taca-Taca metálico en frío (parte alta):</strong> Suelen ser los <strong>taqués hidráulicos</strong> descargados. Si se quita al calentar, no es grave.</li>
                <li><strong>Golpeteo profundo y fuerte (parte baja):</strong> Ruido de <strong>biela</strong>. ¡Gravísimo! Para el motor o lo romperás.</li>
                <li><strong>Chirrido agudo al arrancar:</strong> Correa de accesorios patinando. Toca tensar o cambiar.</li>
                <li><strong>Silbido de ambulancia:</strong> Turbo a punto de romper.</li>
            </ul>
        `
    },
    {
        slug: 'mantenimiento-coche-electrico-vs-combustion',
        title: 'Mantenimiento: Coche Eléctrico vs Gasolina',
        seoTitle: 'Coste Mantenimiento Coche Eléctrico vs Gasolina 2025',
        metaDescription: '¿Es verdad que el coche eléctrico no tiene mantenimiento? Comparamos costes reales de revisiones, frenos y neumáticos.',
        keywords: 'mantenimiento coche electrico coste, averias coche electrico, revision coche electrico',
        content: `
            <p>Se dice que los eléctricos no tienen mantenimiento. ¿Es cierto?</p>
            <h2>Lo que te ahorras en un Eléctrico</h2>
            <ul>
                <li>No hay aceite ni filtros de aceite/aire/combustible.</li>
                <li>No hay correas de distribución.</li>
                <li>No hay embrague, bujías, escapes ni EGR.</li>
                <li>Los frenos duran el doble (gracias a la frenada regenerativa).</li>
            </ul>
            <h2>Lo que SÍ pagas (y a veces más)</h2>
            <ul>
                <li><strong>Neumáticos:</strong> Se desgastan un 20-30% más rápido por el peso y el par motor.</li>
                <li><strong>Refrigerante de baterías:</strong> Se cambia cada 4-5 años.</li>
                <li><strong>Suspensión:</strong> Sufre más por el peso extra.</li>
            </ul>
            <p><strong>Veredicto:</strong> El mantenimiento es un <strong>40-50% más barato</strong> en un eléctrico.</p>
        `
    },
    {
        slug: 'neumaticos-desgaste-irregular',
        title: 'Desgaste de Neumáticos: Qué dice sobre tu coche',
        seoTitle: 'Tipos Desgaste Neumáticos: Alineación y Presión',
        metaDescription: 'Aprende a leer tus neumáticos. Desgaste por los bordes, por el centro o escalonado. Problemas de presión y alineación.',
        keywords: 'desgaste irregular neumaticos, alineacion ruedas precio, presion neumaticos',
        content: `
            <p>Tus ruedas cuentan la historia de tu suspensión.</p>
            <ul>
                <li><strong>Desgaste por ambos bordes:</strong> Has rodado con <strong>presión baja</strong>. Peligroso y aumenta el consumo.</li>
                <li><strong>Desgaste solo por el centro:</strong> Exceso de <strong>presión</strong>.</li>
                <li><strong>Desgaste solo por un borde (interior o exterior):</strong> Problema de <strong>Alineación (Paralelo)</strong> o caídas. Toca taller.</li>
                <li><strong>Desgaste a parches o escalonado:</strong> Amortiguadores en mal estado.</li>
            </ul>
        `
    },
    {
        slug: 'valvula-egr-sucia-sintomas',
        title: 'Válvula EGR Sucia: Síntomas y Limpieza',
        seoTitle: 'Síntomas Válvula EGR Sucia y Cómo Limpiarla',
        metaDescription: 'Tirones, humo negro y falta de potencia. La EGR es culpable de muchos problemas en diesel. ¿Merece la pena anularla?',
        keywords: 'valvula egr sucia sintomas, limpiar egr precio, anular egr itv',
        content: `
            <p>La EGR recircula gases de escape al motor para contaminar menos. El problema: mete hollín al motor.</p>
            <h2>Síntomas de EGR atascada</h2>
            <ul>
                <li>Tirones a bajas revoluciones.</li>
                <li>Humo negro al acelerar.</li>
                <li>Fallo motor en el tablero.</li>
                <li>El coche se "ahoga".</li>
            </ul>
            <h2>¿Limpiar o Anular?</h2>
            <p>Limpiarla cuesta unos 100-150€. Anularla es ilegal y puedes no pasar la ITV, aunque muchos lo hacen para evitar averías futuras.</p>
        `
    },
    {
        slug: 'amortiguadores-gastados-peligros',
        title: 'Amortiguadores Gastados: El peligro invisible',
        seoTitle: 'Síntomas Amortiguadores Gastados: Seguridad y Frenada',
        metaDescription: 'Unos amortiguadores malos aumentan la distancia de frenado un 20%. Descubre los síntomas de balanceo y desgaste.',
        keywords: 'cambiar amortiguadores precio, sintomas amortiguadores gastados, coche barquea',
        content: `
            <p>No solo es confort, es seguridad. Unos amortiguadores al 50% pueden hacerte perder el control en una curva.</p>
            <h2>Síntomas Clave</h2>
            <ul>
                <li><strong>Efecto Barco:</strong> El coche se balancea mucho en curvas.</li>
                <li><strong>Morro clavado:</strong> Al frenar fuerte, el morro baja exageradamente.</li>
                <li><strong>Rebotes:</strong> Al pasar un bache, el coche sigue rebotando varias veces.</li>
                <li><strong>Desgaste irregular de neumáticos.</strong></li>
            </ul>
            <p>Se recomienda cambiarlos cada 80.000 - 100.000 km, siempre por parejas (eje completo).</p>
        `
    },
    {
        slug: 'termostato-coche-fallos',
        title: 'El Coche se Calienta o No Coge Temperatura: Termostato',
        seoTitle: 'Fallo Termostato Coche: Abierto o Cerrado',
        metaDescription: '¿La aguja de temperatura sube y baja? ¿El coche se calienta en atascos? Diagnóstico de termostato abierto o cerrado.',
        keywords: 'fallo termostato coche, coche no coge temperatura, coche se calienta atasco',
        content: `
            <p>El termostato es una válvula barata (20€) que regula la temperatura. Si falla, puede ser de dos formas:</p>
            <h2>1. Se queda ABIERTO (Menos grave)</h2>
            <p>El motor <strong>no coge temperatura</strong>, sobre todo en carretera. La calefacción no calienta bien. Aumenta el consumo y el desgaste del motor.</p>
            <h2>2. Se queda CERRADO (Muy grave)</h2>
            <p>El refrigerante no va al radiador y el motor se <strong>sobrecalienta</strong> rápidamente. Riesgo inminente de culatazo.</p>
        `
    },
    {
        slug: 'bujias-calentadores-fallos',
        title: 'Bujías y Calentadores: Fallos de Encendido',
        seoTitle: 'Cuándo cambiar Bujías y Calentadores Diesel',
        metaDescription: 'Dificultad para arrancar, ralentí inestable o tirones. Diferencias entre bujías (gasolina) y calentadores (diesel).',
        keywords: 'cambiar bujias precio, fallo calentadores diesel, coche gasolina tirones',
        content: `
            <p>Son los encargados de iniciar la combustión.</p>
            <h2>Bujías (Coches Gasolina)</h2>
            <p>Si están viejas, el coche dará tirones, gastará más y tendrá un ralentí inestable. Se cambian cada 30.000 - 60.000 km.</p>
            <h2>Calentadores (Coches Diesel)</h2>
            <p>Solo funcionan al arrancar en frío. Si fallan, al coche le costará mucho arrancar por las mañanas y echará humo blanco/gris unos segundos. Una vez caliente, el coche va perfecto.</p>
        `
    }
];

// GENERAR ARCHIVOS
const blogDir = path.join(__dirname, 'blog');

// Asegurar que existe el directorio
if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir);
}

posts.forEach(post => {
    const htmlContent = template(post);
    const filePath = path.join(blogDir, \`\${post.slug}.html\`);
    fs.writeFileSync(filePath, htmlContent);
    console.log(\`✅ Generado: \${post.slug}.html\`);
});

console.log(\`\\n🎉 ¡20 Artículos generados con éxito!\`);
