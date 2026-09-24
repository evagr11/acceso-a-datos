document.addEventListener("DOMContentLoaded", () => {
    // 1. Cargar el Navbar desde /includes/navbar.html
    const navbarContainer = document.getElementById("navbar-container");
    if (navbarContainer) {
        fetch("/includes/navbar.html")
            .then(res => {
                if (!res.ok) throw new Error(`Error al cargar navbar.html (Status: ${res.status})`);
                return res.text();
            })
            .then(html => {
                navbarContainer.innerHTML = html;
            })
            .catch(err => console.error("Error en Navbar:", err));
    }

    // 2. Cargar el Sidebar desde /includes/sidebar-tema1.html (si existe el contenedor)
    const sidebarContainer = document.getElementById("sidebar-container");
    if (sidebarContainer) {
        fetch("/includes/sidebar-tema1.html")
            .then(res => {
                if (!res.ok) throw new Error(`Error al cargar sidebar-tema1.html (Status: ${res.status})`);
                return res.text();
            })
            .then(html => {
                sidebarContainer.innerHTML = html;
            })
            .catch(err => console.error("Error en Sidebar:", err));
    }
});