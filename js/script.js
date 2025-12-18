function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Mostrar la sección seleccionada
    const selectedSection = document.getElementById('section-' + sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        // Animación simple de entrada
        selectedSection.style.opacity = '0';
        setTimeout(() => {
            selectedSection.style.opacity = '1';
            selectedSection.style.transition = 'opacity 0.2s ease-in';
        }, 10);
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Opcional: Guardar preferencia
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Datos del Cronograma
const schedule = [
    { date: "2025-12-07", activity: "Día de las Velitas", status: "Festivo", type: "holiday" },
    { date: "2025-12-17", activity: "Inicio del Taller HTML/CSS", status: "Completado", type: "class" },
    { date: "2025-12-18", activity: "Entrega de Avance 1", status: "Pendiente", type: "deadline" },
    { date: "2025-12-20", activity: "Evaluación de Conceptos", status: "Próximo", type: "exam" },
    { date: "2025-12-25", activity: "Navidad", status: "Festivo", type: "holiday" }
];

function renderAgenda() {
    const tbody = document.getElementById('agenda-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    schedule.forEach(item => {
        const row = document.createElement('tr');
        
        // Estilos condicionales para el estado
        let statusColor = 'black';
        if (item.status === 'Completado') statusColor = 'green';
        else if (item.status === 'Pendiente') statusColor = '#e67e22'; // Naranja oscuro para mejor visibilidad
        else if (item.status === 'Próximo') statusColor = 'red';
        else if (item.status === 'Festivo') statusColor = '#888';

        row.innerHTML = `
            <td style="padding: 5px; border: 1px solid #D4D0C8;">${item.date}</td>
            <td style="padding: 5px; border: 1px solid #D4D0C8;">${item.activity}</td>
            <td style="padding: 5px; border: 1px solid #D4D0C8; color: ${statusColor}; font-weight: bold;">${item.status}</td>
        `;
        tbody.appendChild(row);
    });
}

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;
    grid.innerHTML = '';

    // Encabezados
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    days.forEach(day => {
        const div = document.createElement('div');
        div.textContent = day;
        div.style.fontWeight = 'bold';
        div.style.fontSize = '12px';
        if (day === 'Sáb' || day === 'Dom') div.style.color = 'red';
        grid.appendChild(div);
    });

    // Generar días para Diciembre 2025 (Empieza Lunes 1)
    // Rellenar días vacíos si el mes no empezara en Lunes (en este caso no es necesario, pero es buena práctica)
    // Diciembre 2025: 1 es Lunes.
    
    for (let i = 1; i <= 31; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i;
        dayDiv.style.padding = '5px';
        dayDiv.style.border = '1px solid #eee';
        dayDiv.style.fontSize = '12px';
        
        // Formato de fecha para comparar
        const dateStr = `2025-12-${i.toString().padStart(2, '0')}`;
        const event = schedule.find(s => s.date === dateStr);

        if (event) {
            if (event.type === 'class') dayDiv.style.backgroundColor = '#ADD8E6'; // Azul
            if (event.type === 'deadline') dayDiv.style.backgroundColor = '#FFD700'; // Amarillo
            if (event.type === 'exam') dayDiv.style.backgroundColor = '#FFA07A'; // Naranja
            if (event.type === 'holiday') dayDiv.style.backgroundColor = '#FFcccb'; // Rojo claro
            
            dayDiv.title = event.activity; // Tooltip
            dayDiv.style.cursor = 'pointer';
            dayDiv.style.fontWeight = 'bold';
        }

        grid.appendChild(dayDiv);
    }
}

function openPdfViewer() {
    const overlay = document.getElementById('pdfOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
    }
}

function closePdfViewer() {
    const overlay = document.getElementById('pdfOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderAgenda();
    renderCalendar();
    // Cargar preferencia de modo oscuro
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Mostrar escritorio por defecto
    showSection('desktop');
    
    // Configurar botón de Inicio para reproducir video
    const toggleBtn = document.getElementById('themeToggle');
    const videoOverlay = document.getElementById('videoOverlay');
    const introVideo = document.getElementById('introVideo');
    const closeVideoBtn = document.getElementById('closeVideo');

    function closeVideo() {
        if (videoOverlay && introVideo) {
            videoOverlay.style.display = 'none';
            introVideo.pause();
            introVideo.currentTime = 0;
        }
    }

    if(toggleBtn && videoOverlay && introVideo) {
        toggleBtn.addEventListener('click', () => {
            videoOverlay.style.display = 'flex';
            introVideo.play().catch(e => console.log("Error al reproducir video:", e));
        });

        introVideo.addEventListener('ended', () => {
            closeVideo();
        });

        if(closeVideoBtn) {
            closeVideoBtn.addEventListener('click', closeVideo);
        }
        
        // Cerrar al hacer clic fuera del video
        videoOverlay.addEventListener('click', (e) => {
            if (e.target === videoOverlay) {
                closeVideo();
            }
        });
    }
});