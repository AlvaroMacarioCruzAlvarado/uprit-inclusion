// ==========================================================================
// MAIN APP LOGIC - EDP GRUPO 3
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initRouting();
    initTeamPanel();
    initSearchEngine();
    initDownloads();
    initMobileNav();
    initSimulator();
    initWilsonLadder();
});

// ==========================================================================
// 1. CLOCK & DATE LOGIC
// ==========================================================================
function initClock() {
    const clockEl = document.getElementById('bannerClock');
    const dateEl = document.getElementById('bannerDate');
    
    if (!clockEl || !dateEl) return;

    function updateClock() {
        const now = new Date();
        
        // Time format (HH:MM:SS)
        clockEl.textContent = now.toLocaleTimeString('es-ES', { hour12: false });
        
        // Date format (weekday, day of month, month)
        dateEl.textContent = now.toLocaleDateString('es-ES', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'short' 
        });
    }
    
    setInterval(updateClock, 1000);
    updateClock(); // Initial run
}

// ==========================================================================
// 2. SPA ROUTING LOGIC
// ==========================================================================
function initRouting() {
    const navLinks = document.querySelectorAll('.nav-item, .nested-item');
    const pageViews = document.querySelectorAll('.page-view');
    const sesionesGroup = document.getElementById('sesionesGroup');
    const appSidebar = document.getElementById('appSidebar');

    function navigateTo(targetId) {
        if (!targetId) return;

        // Hide all views, show active one
        pageViews.forEach(view => {
            view.classList.remove('active');
            if (view.id === targetId) {
                view.classList.add('active');
            }
        });

        // Update active class on nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const hrefAttr = link.getAttribute('href');
            if (hrefAttr && hrefAttr.substring(1) === targetId) {
                link.classList.add('active');
            }
        });

        // Expand/Collapse sessions nested list if target is a session
        const isSessionPage = targetId.startsWith('sesion');
        if (isSessionPage || targetId === 'sesiones') {
            sesionesGroup.classList.add('expanded');
        } else {
            sesionesGroup.classList.remove('expanded');
        }

        // Close sidebar on mobile after clicking
        if (appSidebar) {
            appSidebar.classList.remove('active');
        }

        // Scroll to top of content area
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Attach click events to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href) {
                window.location.hash = href;
            }
        });
    });

    // Sesiones group toggle expansion on click (without breaking navigate)
    const sesionesTrigger = document.getElementById('sesionesTrigger');
    if (sesionesTrigger) {
        sesionesTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            sesionesGroup.classList.toggle('expanded');
            window.location.hash = '#sesion1'; // Go to Session 1 by default
        });
    }

    // Listen to Hash Changes
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            navigateTo(hash);
        } else {
            navigateTo('inicio');
        }
    });

    // Handle initial load hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        navigateTo(initialHash);
    } else {
        navigateTo('inicio');
    }
}

// ==========================================================================
// 3. INTERACTIVE MEMBERS PANEL
// ==========================================================================
const teamMembers = [
    {
        name: "Sánchez Sánchez Jorge",
        color: "#4DFF88",
        img: "https://i.postimg.cc/V6RVNKRH/Jorge.jpg",
        desc: `
            <div class="profile-card-title">Perfil Profesional: Jorge Sánchez</div>
            <p>Originario de Cajamarca, destaca por una sólida formación multidisciplinaria en ciencias económicas, contables, tecnologías y pedagogía.</p>
            <span class="profile-section-title">1. Formación Académica</span>
            <p>• <strong>Ingeniería de Sistemas</strong> (México): Perfil en análisis y desarrollo de soluciones de software.<br>
            • <strong>Educación:</strong> Profesor con Especialidad en Matemática (Nelson Rockefeller).<br>
            • <strong>Posgrado:</strong> Maestro en Ciencias con mención en Tributación (UN Cajamarca).<br>
            • <strong>Ciencias Contables:</strong> Contador Público y Bachiller en Ciencias Contables (ULADECH).<br>
            • <strong>Ciencias Económicas:</strong> Bachiller en Ciencias Económicas (Inca Garcilaso de la Vega).</p>
            <span class="profile-section-title">2. Enfoque e Impacto</span>
            <p>Sólida trayectoria en el sector corporativo y educación superior, liderando áreas de TI y consultorías contables.</p>
        `
    },
    {
        name: "Rengifo Reategui Janeth Natalia",
        color: "#4DFF88",
        img: "https://i.postimg.cc/B6gVvmgm/Janeth.jpg",
        desc: `
            <div class="profile-card-title">Perfil Profesional: Natalia Rengifo</div>
            <p>Educadora con profunda vocación en didáctica de las matemáticas y en contextos de diversidad cultural e interculturalidad.</p>
            <span class="profile-section-title">1. Enfoque Pedagógico</span>
            <p>Especializada en resolución de problemas en matemática para secundaria, adaptando metodologías a realidades geográficas complejas.</p>
            <span class="profile-section-title">2. Mensaje Vocacional</span>
            <div class="profile-quote">
                "Crecer en San Lorenzo, Loreto, me enseñó resiliencia. La educación en zonas interculturales debe revalorar la tradición y el saber matemático local."
            </div>
        `
    },
    {
        name: "Juan Carlos Davila Huaman",
        color: "#4D88FF",
        img: "https://i.postimg.cc/hjr5G2r6/juan-Carlos.jpg",
        desc: `
            <div class="profile-card-title">Perfil Profesional: Juan Carlos Dávila</div>
            <p>Especialista en ciencias exactas y formador de futuros docentes en la Escuela de Educación Superior Pedagógica Pública de Cutervo.</p>
            <span class="profile-section-title">1. Competencias</span>
            <p>• Didáctica de la matemática para formación inicial docente (FID).<br>
            • Gestión curricular y diseño de planes estratégicos de emergencia escolar.<br>
            • Fomento del pensamiento crítico e investigación aplicada en el aula.</p>
        `
    },
    {
        name: "Tejada Grandez Luis Alberto",
        color: "#FFD700",
        img: "https://i.postimg.cc/3RBcwtBz/Luis.jpg",
        desc: `
            <div class="profile-card-title">Perfil Profesional: Luis Tejada</div>
            <p>Destacada trayectoria híbrida que fusiona el marco legal, la sostenibilidad y la docencia de la matemática en Jaén, Cajamarca.</p>
            <span class="profile-section-title">1. Títulos Académicos</span>
            <p>• <strong>Profesor de Educación Secundaria:</strong> Especialidad en Matemática.<br>
            • <strong>Abogado:</strong> Colegiado con especialidad en derecho civil y corporativo.<br>
            • <strong>Ingeniero Ambiental:</strong> Enfoque en gestión del territorio y remediación.</p>
            <span class="profile-section-title">2. Labor Actual</span>
            <p>Docente e investigador en la EESPP "Víctor Andrés Belaunde", articulando ciencias y derecho ambiental.</p>
        `
    },
    {
        name: "Marcos Ferré Paulo Cesar",
        color: "#FF884D",
        img: "https://i.postimg.cc/vTZSx5qk/macos.png",
        desc: `
            <div class="profile-card-title">Perfil Profesional: Paulo Cesar Marcos</div>
            <p>Perfil que combina la disciplina e instrucción estratégica del Ejército del Perú con la pedagogía moderna.</p>
            <span class="profile-section-title">1. Capacidades Clave</span>
            <p>• Formación docente en el IESP Privado "Euroamericano".<br>
            • Liderazgo bajo presión, planificación de contingencias y ética profesional.<br>
            • Diseño e implementación de programas de capacitación técnica institucional.</p>
        `
    },
    {
        name: "Ramírez Sulica Charle Elmer",
        color: "#884DFF",
        img: "https://i.postimg.cc/rmJPpfJn/Charly.jpg",
        desc: `
            <div class="profile-card-title">Perfil Profesional: Charle Ramírez</div>
            <p>Mecánico aeronáutico militar y educador, enfocado en procesos de precisión y diseño instruccional.</p>
            <span class="profile-section-title">1. Formación y Especialidad</span>
            <p>• Mantenimiento y diagnóstico de sistemas de aviación militar.<br>
            • Docencia orientada a la instrucción técnica compleja y control de seguridad.<br>
            • Gestión de equipos operativos y resiliencia institucional en defensa.</p>
        `
    },
    {
        name: "Rodríguez Montalvo Ricardo Antonio",
        color: "#FF4DFF",
        img: "https://i.postimg.cc/nzkPL3k6/Ricardo.jpg",
        desc: `
            <div class="profile-card-title">Perfil Profesional: Ricardo Rodríguez</div>
            <p>Docente de matemática de nivel medio con marcada especialización en administración de la gestión educativa del sector público.</p>
            <span class="profile-section-title">1. Áreas de Dominio</span>
            <p>• Metodología activa y didáctica lúdica del álgebra y la geometría.<br>
            • Marco regulatorio oficial del Ministerio de Educación (MINEDU).<br>
            • Integración de herramientas informáticas (Tics) en la evaluación de competencias.</p>
        `
    },
    {
        name: "Alfredo Alarcón Galindo",
        color: "#00FFFF",
        img: "https://i.postimg.cc/xCR4d6Rs/Alfredo.jpg",
        desc: `
            <div class="profile-card-title">Perfil Profesional: Alfredo Alarcón</div>
            <p>Educador con más de 12 años de labor presencial vinculando las ciencias exactas y el análisis de la realidad histórica-social.</p>
            <span class="profile-section-title">1. Especialización</span>
            <p>• Segunda especialidad en Ciencias Sociales y Maestría en Gestión Pública.<br>
            • Diseño instruccional orientado a la inserción universitaria de jóvenes rurales.<br>
            • Promoción de competencias de ciudadanía crítica mediante las matemáticas.</p>
        `
    },
    {
        name: "Cruz Mendoza Eder Grover",
        color: "#00FFFF",
        img: "https://i.postimg.cc/yN8hMGyW/ever-cruz.png",
        desc: `
            <div class="profile-card-title">Perfil Profesional: Eder Cruz Mendoza</div>
            <p>Profesor de matemática e informática con enfoque en políticas de modernización educativa y acreditación académica.</p>
            <span class="profile-section-title">1. Competencias Técnicas</span>
            <p>• Diseño curricular y formulación de rúbricas analíticas para secundaria.<br>
            • Gestión de sistemas administrativos y bases de datos educativas.<br>
            • Planificación orientada a resultados basados en el desempeño (CNEB).</p>
        `
    }
];

function initTeamPanel() {
    const deck = document.getElementById('membersDeck');
    const drawerOverlay = document.getElementById('profileDrawerOverlay');
    const closeBtn = document.getElementById('closeDrawerBtn');
    const drawerTitleName = document.getElementById('drawerTitleName');
    const drawerPhoto = document.getElementById('drawerPhoto');
    const drawerContentInfo = document.getElementById('drawerContentInfo');

    if (!deck) return;

    // Dynamically render members card deck
    teamMembers.forEach((member, index) => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
            <div class="member-card-photo-frame" style="border-color: ${member.color}">
                <img src="${member.img}" alt="${member.name}" class="member-card-photo">
            </div>
            <div class="member-card-name">${member.name}</div>
            <div class="member-card-role">Integrante</div>
        `;
        
        card.addEventListener('click', () => {
            if (drawerTitleName) drawerTitleName.textContent = member.name;
            if (drawerPhoto) {
                drawerPhoto.src = member.img;
                drawerPhoto.alt = member.name;
            }
            if (drawerContentInfo) drawerContentInfo.innerHTML = member.desc;
            if (drawerOverlay) drawerOverlay.classList.add('active');
        });
        
        deck.appendChild(card);
    });

    if (closeBtn && drawerOverlay) {
        closeBtn.addEventListener('click', () => {
            drawerOverlay.classList.remove('active');
        });
        
        drawerOverlay.addEventListener('click', (e) => {
            if (e.target === drawerOverlay) {
                drawerOverlay.classList.remove('active');
            }
        });
    }
}

// ==========================================================================
// 4. CLIENT-SIDE SEARCH ENGINE WITH AUTOCOMPLETE
// ==========================================================================
const searchCorpus = [
    {
        id: "inicio",
        category: "Inicio",
        title: "Inicio - Portafolio Académico Grupo 3",
        text: "La evaluación constituye uno de los procesos más importantes dentro de la práctica educativa... Dra. Karina Maribel Aroni Salcedo. Universidad Privada de Trujillo."
    },
    {
        id: "sesion1",
        category: "Sesión I",
        title: "Sesión I - Fundamentos de la Evaluación Educativa",
        text: "En esta sesión se abordan las bases conceptuales... Medición, Calificación y Evaluación en Matemática. Asignar notas cualitativas y cuantitativas."
    },
    {
        id: "sesion2",
        category: "Sesión II",
        title: "Sesión II - Funciones de la Evaluación (Formativa y Sumativa)",
        text: "La evaluación adquiere sentido a través de la intención didáctica. Evaluación formativa reguladora de aprendizaje y evaluación sumativa de certificación de logros."
    },
    {
        id: "sesion3",
        category: "Sesión III",
        title: "Sesión III - Enfoques de Evaluación Contemporánea y el CNEB",
        text: "Transición hacia el Enfoque por Competencias del CNEB. Evaluación auténtica basada en el desempeño real del alumno. El alineamiento constructivo de John Biggs."
    },
    {
        id: "sesion4",
        category: "Sesión IV",
        title: "Sesión IV - Planificación de la Evaluación: Criterios e Indicadores",
        text: "Criterios e Indicadores organizados en una Matriz de Planificación en Matemática. Referentes explícitos de valoración y evidencias de regularidad y cambio."
    },
    {
        id: "sesion5",
        category: "Sesión V",
        title: "Sesión V - Diseño de Instrumentos: Cotejo y Estimación",
        text: "Lista de Cotejo de valor dicotómico y Escala de Estimación para la resolución de problemas matemáticos en base al desempeño AD, A, B y C del estudiante."
    },
    {
        id: "sesion6",
        category: "Sesión VI",
        title: "Sesión VI - Retroalimentación Formativa y la Escalera de Wilson",
        text: "La Escalera de Daniel Wilson consta de 4 peldaños conversacionales didácticos: Clarificar, Valorar, Expresar Inquietudes y Hacer Sugerencias."
    },
    {
        id: "sesion7",
        category: "Sesión VII",
        title: "Sesión VII - Análisis de Datos Educativos e Interpretación",
        text: "Tabulación de resultados grupales. Toma de decisiones didácticas, reforzamiento matemático empleando Geogebra y tutorías entre pares en el aula escolar."
    },
    {
        id: "conclusiones",
        category: "Conclusiones",
        title: "Conclusiones y Análisis Crítico General",
        text: "La evaluación trasciende la simple asignación de calificaciones para convertirse en mejora continua. Desafíos de enfoques tradicionales, prospectiva tecnológica digital y la IA."
    }
];

function initSearchEngine() {
    const searchInput = document.getElementById('globalSearchInput');
    const autocompletePanel = document.getElementById('searchAutocompletePanel');
    const resultsHeader = document.getElementById('searchResultsHeader');
    const resultsList = document.getElementById('searchResultsList');
    
    if (!searchInput || !autocompletePanel) return;

    // Show/hide autocomplete as user types
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (query.length === 0) {
            autocompletePanel.classList.remove('active');
            autocompletePanel.innerHTML = '';
            return;
        }

        const matches = searchCorpus.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.text.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query)
        );

        if (matches.length === 0) {
            autocompletePanel.innerHTML = `
                <div class="autocomplete-item" style="cursor: default; pointer-events: none;">
                    <div class="autocomplete-title" style="color: var(--color-muted);">Sin resultados</div>
                </div>
            `;
        } else {
            autocompletePanel.innerHTML = '';
            matches.slice(0, 5).forEach(match => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.innerHTML = `
                    <div class="autocomplete-category">${match.category}</div>
                    <div class="autocomplete-title">${match.title}</div>
                `;
                item.addEventListener('click', () => {
                    window.location.hash = `#${match.id}`;
                    autocompletePanel.classList.remove('active');
                    searchInput.value = ''; // clear search input
                });
                autocompletePanel.appendChild(item);
            });
        }
        autocompletePanel.classList.add('active');
    });

    // Hide dropdown on click outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !autocompletePanel.contains(e.target)) {
            autocompletePanel.classList.remove('active');
        }
    });

    // Pressing Enter performs full search
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query.length > 0) {
                autocompletePanel.classList.remove('active');
                executeSearch(query);
            }
        }
    });

    function executeSearch(query) {
        // Change window location to results view
        window.location.hash = '#buscador';
        
        const lowerQuery = query.toLowerCase();
        const matches = [];

        searchCorpus.forEach(item => {
            const matchIndex = item.text.toLowerCase().indexOf(lowerQuery);
            const titleMatch = item.title.toLowerCase().includes(lowerQuery);
            
            if (matchIndex !== -1 || titleMatch) {
                // Generate snippet around query match
                let snippet = "";
                if (matchIndex !== -1) {
                    const start = Math.max(0, matchIndex - 60);
                    const end = Math.min(item.text.length, matchIndex + lowerQuery.length + 80);
                    snippet = item.text.substring(start, end);
                    if (start > 0) snippet = "..." + snippet;
                    if (end < item.text.length) snippet = snippet + "...";
                    
                    // Highlight match using regex
                    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
                    snippet = snippet.replace(regex, '<mark>$1</mark>');
                } else {
                    snippet = item.text.substring(0, 140) + "...";
                }
                
                matches.push({
                    id: item.id,
                    category: item.category,
                    title: item.title,
                    snippet: snippet
                });
            }
        });

        // Render Results count
        if (resultsHeader) {
            resultsHeader.innerHTML = `Se encontraron <span>${matches.length}</span> resultados para tu búsqueda: "<span>${escapeHtml(query)}</span>"`;
        }

        // Render Results List
        if (!resultsList) return;
        
        if (matches.length === 0) {
            resultsList.innerHTML = `
                <div class="no-results">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <div class="no-results-title">No hay resultados coincidentes</div>
                    <p>Prueba con otras palabras como "Wilson", "CNEB", "Cotejo" o "Didáctica".</p>
                </div>
            `;
        } else {
            resultsList.innerHTML = "";
            matches.forEach(match => {
                const itemEl = document.createElement('div');
                itemEl.className = 'search-result-item';
                itemEl.innerHTML = `
                    <div class="search-result-title-row">
                        <h4 class="result-title">${match.title}</h4>
                        <span class="result-category">${match.category}</span>
                    </div>
                    <p class="result-snippet">${match.snippet}</p>
                `;
                
                itemEl.addEventListener('click', () => {
                    window.location.hash = `#${match.id}`;
                });
                
                resultsList.appendChild(itemEl);
            });
        }
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// ==========================================================================
// 5. BLOB-BASED CLIENT-SIDE DOWNLOAD MANAGER
// ==========================================================================
const mockFiles = {
    guia_fundamentos: {
        filename: "Guia_Fundamentos_Conceptual_Grupo3.txt",
        mime: "text/plain;charset=utf-8",
        content: `========================================================================
EVALUACIÓN DE LOS APRENDIZAJES - GUÍA CONCEPTUAL DE FUNDAMENTOS
UNIVERSIDAD PRIVADA DE TRUJILLO • GRUPO 3
========================================================================

CONTENIDO DE LA GUÍA:
1. Definición de Medición: Asignación objetiva de escalas de valor sin emitir juicio pedagógico.
2. Definición de Calificación: Resumen formal o administrativo en un código alfanumérico.
3. Definición de Evaluación: Proceso sistémico continuo de obtención de evidencias para la toma de decisiones.

DIFERENCIAS CLAVE:
- Medición responde a la pregunta: ¿Cuánto? (Ejemplo: Obtener 14 respuestas correctas).
- Calificación responde a la pregunta: ¿Qué nota oficial corresponde? (Ejemplo: Nota "B" en el acta).
- Evaluación responde a la pregunta: ¿Cómo se puede mejorar el aprendizaje? (Ejemplo: Ajuste didáctico).

Elaborado por: Grupo 03 (Sánchez, Rengifo, Dávila, Tejada, Marcos, Ramírez, Rodríguez, Alarcón, Cruz).
Asesora: Dra. Karina Maribel Aroni Salcedo.
Año: 2026`
    },
    funciones_evaluacion: {
        filename: "Evaluacion_Formativa_Sumativa_Contraste.txt",
        mime: "text/plain;charset=utf-8",
        content: `========================================================================
MATRIZ DE FUNCIONES DE LA EVALUACIÓN: FORMATIVA Y SUMATIVA
UNIVERSIDAD PRIVADA DE TRUJILLO • GRUPO 3
========================================================================

ESTUDIO DE CONTRASTE:

1. EVALUACIÓN FORMATIVA (Evaluación para el Aprendizaje):
- Propósito: Adaptar y regular la enseñanza sobre la marcha. Retroalimentar al alumno.
- Momento: Durante todo el proceso escolar (Formativa procesual).
- Enfoque: Cualitativo y descriptivo, centrado en identificar dificultades y brechas.
- Instrumento sugerido: Cuadernos de campo, registros descriptivos y autoevaluaciones.

2. EVALUACIÓN SUMATIVA (Evaluación del Aprendizaje):
- Propósito: Valorar y certificar formalmente la competencia de una unidad o ciclo.
- Momento: Al término de una etapa instruccional.
- Enfoque: Cuantitativo o acumulado de consolidación de logros.
- Instrumento sugerido: Exámenes escritos globales, proyectos y portafolios.

Grupo 03 - Trujillo, Perú.`
    },
    criterios_evaluacion: {
        filename: "Criterios_Evaluacion_Lineamientos_CNEB.txt",
        mime: "text/plain;charset=utf-8",
        content: `========================================================================
LINEAMIENTOS CNEB PARA FORMULAR CRITERIOS DE EVALUACIÓN
UNIVERSIDAD PRIVADA DE TRUJILLO • GRUPO 3
========================================================================

PASOS PEDAGÓGICOS OFICIALES (Currículo Nacional):

1. Analizar la competencia y sus capacidades en profundidad.
2. Identificar el estándar de aprendizaje del ciclo correspondiente.
3. Analizar los desempeños de grado para contextualizarlos.
4. Redactar los Criterios explicitando la acción, el contenido y la condición.
5. Diseñar la situación de evaluación y la evidencia donde se observará dicho desempeño.

EJEMPLO EN MATEMÁTICA:
- Competencia: Resuelve problemas de regularidad, equivalencia y cambio.
- Criterio: Representa simbólica y gráficamente una función lineal, explicando la pendiente.`
    },
    lista_cotejo: {
        filename: "Lista_Cotejo_Resolucion_Problemas.csv",
        mime: "text/csv;charset=utf-8",
        content: `Nro,Criterio de Evaluacion,Logrado (Si),En Proceso (No),Observaciones
1,Identifica datos explicitados en el enunciado del problema,,,
2,Plantea un modelo matematico o relacion de variables,,,
3,Ejecuta algoritmos de calculo sin errores de signo,,,
4,Explica e interpreta el resultado segun el contexto real,,,
`
    },
    guia_wilson: {
        filename: "Guia_Wilson_Escalera_Retroalimentacion.txt",
        mime: "text/plain;charset=utf-8",
        content: `========================================================================
LA ESCALERA DE RETROALIMENTACIÓN DE WILSON
UNIVERSIDAD PRIVADA DE TRUJILLO • GRUPO 3
========================================================================

PELDAÑO 1: CLARIFICAR
- Preguntar para entender las ideas o la lógica detrás del trabajo.
- Evitar suposiciones.
- Ejemplo: "¿Podrías comentarme cómo obtuviste esta razón de cambio?"

PELDAÑO 2: VALORAR
- Resaltar aspectos positivos, esfuerzos y la estructura lógica de forma específica.
- Ejemplo: "Me parece excelente la forma en que graficaste las parábolas."

PELDAÑO 3: EXPRESAR INQUIETUDES
- Plantear dudas genuinas o advertencias sobre posibles errores o inconsistencias.
- Ejemplo: "Me queda la duda de si este dominio abarca números negativos."

PELDAÑO 4: HACER SUGERENCIAS
- Brindar pautas precisas que el alumno pueda ejecutar de manera autónoma.
- Ejemplo: "Te sugiero verificar la tabla de valores de la ecuación cuadrática."`
    },
    portafolio_completo: {
        filename: "Portafolio_Completo_G3.txt",
        mime: "text/plain;charset=utf-8",
        content: `========================================================================
PORTAFOLIO DE EVIDENCIAS DE APRENDIZAJE - PAQUETE COMPLETO
UNIVERSIDAD PRIVADA DE TRUJILLO • GRUPO 3
========================================================================

Este portafolio recopila de manera integrada todo el material pedagógico de las
siete sesiones de clase, conclusiones y matrices analíticas estructuradas.

CONTENIDOS INTEGRADOS:
- Sesión I: Definiciones Fundamentales (Evaluación, Medición y Calificación).
- Sesión II: Funciones Formativa y Sumativa.
- Sesión III: Enfoques Contemporáneos del CNEB y Alineamiento Constructivo.
- Sesión IV: Planificación mediante Criterios e Indicadores.
- Sesión V: Diseño de Listas de Cotejo y Escalas en Matemática.
- Sesión VI: Retroalimentación Formativa y el Diálogo de Wilson.
- Sesión VII: Toma de Decisiones Pedagógicas basadas en Datos Estadísticos.

GRUPO INTEGRANTE:
1. Sánchez Sánchez Jorge
2. Rengifo Reategui Janeth Natalia
3. Juan Carlos Davila Huaman
4. Tejada Grandez Luis Alberto
5. Marcos Ferré Paulo Cesar
6. Ramírez Sulica Charle Elmer
7. Rodríguez Montalvo Ricardo Antonio
8. Alfredo Alarcón Galindo
9. Cruz Mendoza Eder Grover

Curso guiado por: Dra. Karina Maribel Aroni Salcedo.`
    }
};

function initDownloads() {
    const downloadBtns = document.querySelectorAll('.btn-cloud-download');
    const quickDownloadBtn = document.getElementById('quickDownloadBtn');

    function triggerDownload(fileKey) {
        const fileData = mockFiles[fileKey];
        if (!fileData) return;

        const blob = new Blob([fileData.content], { type: fileData.mime });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = fileData.filename;
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Attach click events to card download buttons
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const fileKey = btn.dataset.file;
            if (fileKey) {
                triggerDownload(fileKey);
            }
        });
    });

    // Attach click event to top header quick download button
    if (quickDownloadBtn) {
        quickDownloadBtn.addEventListener('click', () => {
            triggerDownload('portafolio_completo');
        });
    }
}

// ==========================================================================
// 6. MOBILE SIDEBAR MENU TOGGLE
// ==========================================================================
function initMobileNav() {
    const toggleBtn = document.getElementById('mobileNavToggle');
    const sidebar = document.getElementById('appSidebar');
    
    if (!toggleBtn || !sidebar) return;

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('active');
    });

    // Close sidebar on clicking outside the sidebar on mobile screens
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
            const isClickInsideSidebar = sidebar.contains(e.target);
            const isClickToggleBtn = toggleBtn.contains(e.target);
            
            if (!isClickInsideSidebar && !isClickToggleBtn) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// ==========================================================================
// 7. INTERACTIVE EVALUATION FORM SIMULATOR (SESSION V)
// ==========================================================================
function initSimulator() {
    const d1 = document.getElementById('scoreD1');
    const d2 = document.getElementById('scoreD2');
    const d3 = document.getElementById('scoreD3');
    const finalRating = document.getElementById('finalLogroRating');

    if (!d1 || !d2 || !d3 || !finalRating) return;

    function calculate() {
        const val1 = parseInt(d1.value) || 0;
        const val2 = parseInt(d2.value) || 0;
        const val3 = parseInt(d3.value) || 0;
        const avg = Math.round((val1 + val2 + val3) / 3);

        let ratingText = "Proceso (B)";
        if (avg === 1) ratingText = "Inicio (C)";
        else if (avg === 2) ratingText = "Proceso (B)";
        else if (avg === 3) ratingText = "Logrado (A)";
        else if (avg === 4) ratingText = "Destacado (AD)";

        finalRating.textContent = ratingText;
    }

    d1.addEventListener('change', calculate);
    d2.addEventListener('change', calculate);
    d3.addEventListener('change', calculate);
    
    calculate(); // initial run
}

// ==========================================================================
// 8. CLICK-TO-REVEAL WILSON'S LADDER STEPPER (SESSION VI)
// ==========================================================================
function initWilsonLadder() {
    const stepper = document.getElementById('wilsonStepper');
    if (!stepper) return;

    const steps = stepper.querySelectorAll('.ladder-step');
    steps.forEach(step => {
        const trigger = step.querySelector('.ladder-step-trigger');
        if (trigger) {
            trigger.addEventListener('click', () => {
                const isActive = step.classList.contains('active');
                
                // Collapse all steps
                steps.forEach(s => s.classList.remove('active'));
                
                // Toggle clicked step
                if (!isActive) {
                    step.classList.add('active');
                }
            });
        }
    });
}
