/**
 * Script profesional para Landing Page de Viajes
 * Maneja navegación lateral, scroll suave y adaptabilidad móvil
 */

const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');

// 1. GESTIÓN DEL MENÚ LATERAL (ABRIR/CERRAR)
menuBtn.addEventListener('click', () => {
    const isActive = sidebar.classList.toggle('active');
    
    // Mejora UX Móvil: Evita que el usuario haga scroll en el contenido
    // mientras el menú lateral está desplegado.
    if (isActive) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// 2. NAVEGACIÓN Y SCROLL SUAVE
document.querySelectorAll('.sidebar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Evita el salto brusco del navegador

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Cerramos el menú y devolvemos el scroll al body
            sidebar.classList.remove('active');
            document.body.style.overflow = 'auto';

            /**
             * Cálculo de posición (Offset):
             * Restamos un pequeño margen (60px) para que el título del día
             * no quede tapado por el borde superior o por el botón circular.
             */
            const offset = 60;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            // Ejecución del scroll suave compatible con todos los navegadores
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// 3. CIERRE AL TOCAR FUERA (UX PROFESIONAL)
// Si el usuario toca el contenido principal mientras el menú está abierto, se cierra.
document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('active') && 
        !sidebar.contains(e.target) && 
        !menuBtn.contains(e.target)) {
        
        sidebar.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
