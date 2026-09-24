document.addEventListener("DOMContentLoaded", () => {
    // Calcula la ruta base relativa según la profundidad de la página actual.
    // Así funciona tanto en local (raíz) como en GitHub Pages (subcarpeta del repo),
    // sin depender del nombre del repositorio.
    const isNested = window.location.pathname.includes("/temas/");
    const basePath = isNested ? "../../" : "";

    // Convierte los enlaces absolutos (href="/...") del HTML inyectado
    // en enlaces relativos válidos desde la página actual.
    function fixLinks(html) {
        return html.replace(/href="\//g, `href="${basePath}`);
    }

    // 1. Cargar el Navbar desde includes/navbar.html
    const navbarContainer = document.getElementById("navbar-container");
    if (navbarContainer) {
        fetch(`${basePath}includes/navbar.html`)
            .then(res => {
                if (!res.ok) throw new Error(`Error al cargar navbar.html (Status: ${res.status})`);
                return res.text();
            })
            .then(html => {
                navbarContainer.innerHTML = fixLinks(html);
            })
            .catch(err => console.error("Error en Navbar:", err));
    }

    // 2. Cargar el Sidebar desde includes/sidebar-tema1.html (si existe el contenedor)
    const sidebarContainer = document.getElementById("sidebar-container");
    if (sidebarContainer) {
        fetch(`${basePath}includes/sidebar-tema1.html`)
            .then(res => {
                if (!res.ok) throw new Error(`Error al cargar sidebar-tema1.html (Status: ${res.status})`);
                return res.text();
            })
            .then(html => {
                sidebarContainer.innerHTML = fixLinks(html);
            })
            .catch(err => console.error("Error en Sidebar:", err));
    }
});