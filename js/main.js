/* ==========================================================================
   LÓGICA GLOBAL Y UTILIDADES INTERACTIVAS (main.js)
   Garantiza interactividad general, copia de código y adaptabilidad UI
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCodeCopyButtons();
  initSmoothScroll();
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