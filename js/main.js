
document.addEventListener('DOMContentLoaded', function () {
  inicializarMenuMovil();
  inicializarStickyNavbar();
  inicializarAnimacionesScroll();
  inicializarAcordeonFAQ();
  inicializarContadoresImpacto();
});

/**
 * Gestiona la apertura y cierre del menu de navegacion en dispositivos moviles.
 */
function inicializarMenuMovil() {
  const btnToggle = document.getElementById('mobile-menu-btn');
  const menuContainer = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-menu-open');
  const iconClose = document.getElementById('icon-menu-close');
  const navbar = document.getElementById('main-navbar');

  if (!btnToggle || !menuContainer) return;

  function abrirMenu() {
    menuContainer.classList.remove('hidden');
    document.body.classList.add('nav-open');
    btnToggle.setAttribute('aria-expanded', 'true');
    if (iconOpen) iconOpen.classList.add('hidden');
    if (iconClose) iconClose.classList.remove('hidden');
  }

  function cerrarMenu() {
    menuContainer.classList.add('hidden');
    document.body.classList.remove('nav-open');
    btnToggle.setAttribute('aria-expanded', 'false');
    if (iconOpen) iconOpen.classList.remove('hidden');
    if (iconClose) iconClose.classList.add('hidden');
  }

  btnToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    const estaOculto = menuContainer.classList.contains('hidden');
    if (estaOculto) {
      abrirMenu();
    } else {
      cerrarMenu();
    }
  });

  const enlacesMoviles = menuContainer.querySelectorAll('a');
  enlacesMoviles.forEach(function (enlace) {
    enlace.addEventListener('click', function () {
      cerrarMenu();
    });
  });

  // Cerrar el menú al hacer clic fuera de la barra de navegación
  document.addEventListener('click', function (e) {
    if (navbar && !navbar.contains(e.target) && !menuContainer.classList.contains('hidden')) {
      cerrarMenu();
    }
  });
}

/**
 * Aplica estilos mas compactos a la barra de navegacion cuando el usuario hace scroll hacia abajo.
 */
function inicializarStickyNavbar() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      navbar.classList.add('navbar-compact');
    } else {
      navbar.classList.remove('navbar-compact');
    }
  });
}

/**
 * Configura la aparicion gradual de elementos al hacer scroll mediante Intersection Observer.
 */
function inicializarAnimacionesScroll() {
  const elementos = document.querySelectorAll('.animate-on-scroll');
  if (!elementos.length) return;

  const observer = new IntersectionObserver(function (entries, observerInstance) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        observerInstance.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  elementos.forEach(function (el) {
    observer.observe(el);
  });
}

/**
 * Gestiona el comportamiento desplegable de la seccion de preguntas frecuentes (FAQ).
 */
function inicializarAcordeonFAQ() {
  const itemsFAQ = document.querySelectorAll('.faq-item');
  if (!itemsFAQ.length) return;

  itemsFAQ.forEach(function (item) {
    const boton = item.querySelector('.faq-button');
    if (!boton) return;

    boton.addEventListener('click', function () {
      const estaActivo = item.classList.contains('active');

      itemsFAQ.forEach(function (otroItem) {
        otroItem.classList.remove('active');
      });

      if (!estaActivo) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * Anima el conteo de los numeros de impacto social y economico al entrar en vista.
 */
function inicializarContadoresImpacto() {
  const contadores = document.querySelectorAll('.stat-number');
  if (!contadores.length) return;

  const observerContador = new IntersectionObserver(function (entries, observerInstance) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const elemento = entry.target;
        const valorObjetivo = parseInt(elemento.getAttribute('data-target'), 10);
        const prefijo = elemento.getAttribute('data-prefix') || '';
        const sufijo = elemento.getAttribute('data-suffix') || '';

        animarNumero(elemento, 0, valorObjetivo, 2000, prefijo, sufijo);
        observerInstance.unobserve(elemento);
      }
    });
  }, { threshold: 0.5 });

  contadores.forEach(function (contador) {
    observerContador.observe(contador);
  });
}

/**
 * Realiza la animacion incremental de un numero desde inicio hasta fin.
 * @param {HTMLElement} el - Elemento del DOM donde se mostrara el valor.
 * @param {number} inicio - Valor inicial del conteo.
 * @param {number} fin - Valor objetivo del conteo.
 * @param {number} duracion - Duracion total de la animacion en milisegundos.
 * @param {string} prefijo - Caracter o texto previo al numero (ejemplo: +).
 * @param {string} sufijo - Caracter o texto posterior al numero (ejemplo: %).
 */
function animarNumero(el, inicio, fin, duracion, prefijo, sufijo) {
  let tiempoInicio = null;

  function paso(timestamp) {
    if (!tiempoInicio) tiempoInicio = timestamp;
    const progreso = Math.min((timestamp - tiempoInicio) / duracion, 1);
    const valorActual = Math.floor(progreso * (fin - inicio) + inicio);
    el.textContent = prefijo + valorActual.toLocaleString('es-PE') + sufijo;

    if (progreso < 1) {
      window.requestAnimationFrame(paso);
    }
  }

  window.requestAnimationFrame(paso);
}
