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

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Cargar preferencia de modo oscuro
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Mostrar escritorio por defecto
    showSection('desktop');
    
    // Configurar botón de Inicio para volver al escritorio
    const toggleBtn = document.getElementById('themeToggle');
    if(toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            showSection('desktop');
        });
    }
});