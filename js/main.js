/* ==========================================================================
   LÓGICA GLOBAL Y UTILIDADES INTERACTIVAS (main.js)
   Garantiza interactividad general, copia de código y adaptabilidad UI
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCodeCopyButtons();
  initSmoothScroll();
  initScrollSpy();
});

// El sidebar se inyecta de forma asíncrona (fetch) desde components.js,
// así que el scrollspy también se inicializa cuando ese sidebar ya está en el DOM.
document.addEventListener('sidebar:loaded', () => {
  initScrollSpy();
});

/**
 * Añade un botón funcional de "Copiar código" en la cabecera de los bloques estilo VS Code.
 */
function initCodeCopyButtons() {
  const vscodeHeaders = document.querySelectorAll('.vscode-header');

  vscodeHeaders.forEach(header => {
    // Evitamos duplicar botones si el script se ejecuta múltiples veces
    if (header.querySelector('.copy-btn')) return;

    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerText = 'Copiar';
    copyBtn.setAttribute('title', 'Copiar código al portapapeles');

    // Estilos rápidos aplicados directamente o mediante clase CSS
    Object.assign(copyBtn.style, {
      marginLeft: 'auto',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: '#d4d4d4',
      borderRadius: '4px',
      padding: '2px 8px',
      fontSize: '0.75rem',
      cursor: 'pointer',
      transition: 'background 0.2s ease'
    });

    copyBtn.addEventListener('mouseenter', () => copyBtn.style.background = 'rgba(255, 255, 255, 0.2)');
    copyBtn.addEventListener('mouseleave', () => copyBtn.style.background = 'rgba(255, 255, 255, 0.1)');

    copyBtn.addEventListener('click', () => {
      const vscodeWindow = header.closest('.vscode-window');
      const codeElement = vscodeWindow ? vscodeWindow.querySelector('code') : null;

      if (codeElement) {
        navigator.clipboard.writeText(codeElement.innerText)
          .then(() => {
            copyBtn.innerText = '¡Copiado!';
            copyBtn.style.color = '#27c93f';

            setTimeout(() => {
              copyBtn.innerText = 'Copiar';
              copyBtn.style.color = '#d4d4d4';
            }, 2000);
          })
          .catch(err => {
            console.error('[Main] Error al copiar código: ', err);
          });
      }
    });

    header.appendChild(copyBtn);
  });
}

/**
 * Resalta en el sidebar el enlace de la sección que está actualmente visible en pantalla.
 * Pensado para páginas de una sola página (como Interpretación de Código), donde el
 * sidebar enlaza a anclas (#id) dentro del propio documento en vez de a otros ficheros.
 */
function initScrollSpy() {
  const sidebarLinks = document.querySelectorAll('.sidebar a[href^="#"]');
  if (!sidebarLinks.length) return;

  // Evitamos crear observadores duplicados si esta función se llama varias veces
  // (p.ej. una vez en DOMContentLoaded y otra al terminarse de inyectar el sidebar).
  if (initScrollSpy._initialized) return;
  initScrollSpy._initialized = true;

  const sections = [];
  sidebarLinks.forEach(link => {
    const id = link.getAttribute('href');
    const section = document.querySelector(id);
    if (section) sections.push({ id, link, section });
  });

  if (!sections.length) return;

  function setActive(id) {
    sidebarLinks.forEach(link => link.classList.remove('active'));
    const match = sections.find(s => s.id === id);
    if (match) match.link.classList.add('active');
  }

  const observer = new IntersectionObserver((entries) => {
    // Nos quedamos con la sección visible más cercana a la parte superior del viewport.
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

    if (visible.length > 0) {
      setActive('#' + visible[0].target.id);
    }
  }, {
    rootMargin: '-96px 0px -70% 0px', // Ajustado a la altura del navbar
    threshold: 0
  });

  sections.forEach(({ section }) => observer.observe(section));

  // Activamos el primero por defecto al cargar.
  setActive(sections[0].id);
}

/**
 * Habilita el desplazamiento suave para enlaces de ancla dentro de la misma página.
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}