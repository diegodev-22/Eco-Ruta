
document.addEventListener('DOMContentLoaded', function () {
  inicializarModalCheckout();
});

/**
 * Configura los eventos del modal de pago, formateo de campos e interacción de pestañas.
 */
function inicializarModalCheckout() {
  const modalContainer = document.getElementById('checkout-modal');
  const btnCerrar = document.getElementById('close-checkout-modal');
  const formPago = document.getElementById('checkout-form');
  const modalBody = document.getElementById('checkout-modal-body');
  const modalSuccess = document.getElementById('checkout-modal-success');

  if (!modalContainer) return;

  // Botones de planes que abren el modal
  const botonesCheckout = document.querySelectorAll('[data-open-checkout="true"]');
  botonesCheckout.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const planNombre = btn.getAttribute('data-plan-name') || 'Plan EcoRuta';
      const planPrecio = btn.getAttribute('data-plan-price') || 'S/ 0 / mes';

      abrirModal(planNombre, planPrecio);
    });
  });

  // Evento para cerrar modal
  if (btnCerrar) {
    btnCerrar.addEventListener('click', cerrarModal);
  }

  // Cerrar al hacer clic en el fondo oscuro
  modalContainer.addEventListener('click', function (e) {
    if (e.target === modalContainer) {
      cerrarModal();
    }
  });

  // Cerrar con la tecla ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modalContainer.classList.contains('hidden')) {
      cerrarModal();
    }
  });

  // Configuración de pestañas de métodos de pago
  const tabsMetodos = document.querySelectorAll('.payment-tab-btn');
  const panelesMetodos = document.querySelectorAll('.payment-tab-panel');

  tabsMetodos.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const targetId = tab.getAttribute('data-target-tab');

      tabsMetodos.forEach(t => t.classList.remove('active-payment-tab'));
      panelesMetodos.forEach(p => p.classList.add('hidden'));

      tab.classList.add('active-payment-tab');
      const panelSeleccionado = document.getElementById(targetId);
      if (panelSeleccionado) {
        panelSeleccionado.classList.remove('hidden');
      }
    });
  });

  // Formateo en tiempo real del número de tarjeta
  const inputTarjeta = document.getElementById('card-number');
  if (inputTarjeta) {
    inputTarjeta.addEventListener('input', function (e) {
      let valor = e.target.value.replace(/\D/g, '');
      valor = valor.substring(0, 16);
      const partes = [];
      for (let i = 0; i < valor.length; i += 4) {
        partes.push(valor.substring(i, i + 4));
      }
      e.target.value = partes.join(' ');
    });
  }

  // Formateo de fecha de expiración MM/AA
  const inputExpiracion = document.getElementById('card-expiry');
  if (inputExpiracion) {
    inputExpiracion.addEventListener('input', function (e) {
      let valor = e.target.value.replace(/\D/g, '');
      if (valor.length >= 2) {
        valor = valor.substring(0, 2) + '/' + valor.substring(2, 4);
      }
      e.target.value = valor.substring(0, 5);
    });
  }

  // Envio del formulario de pago
  if (formPago) {
    formPago.addEventListener('submit', function (e) {
      e.preventDefault();

      const btnSubmit = formPago.querySelector('button[type="submit"]');
      const textoOriginal = btnSubmit.innerHTML;

      // Mostrar estado de procesamiento
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Procesando pago seguro...
      `;

      setTimeout(function () {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = textoOriginal;

        if (modalBody && modalSuccess) {
          modalBody.classList.add('hidden');
          modalSuccess.classList.remove('hidden');
        }
      }, 1800);
    });
  }
}

/**
 * Abre el modal de checkout actualizando el plan seleccionado.
 * @param {string} nombre - Nombre del plan elegido.
 * @param {string} precio - Precio del plan.
 */
function abrirModal(nombre, precio) {
  const modalContainer = document.getElementById('checkout-modal');
  const modalBody = document.getElementById('checkout-modal-body');
  const modalSuccess = document.getElementById('checkout-modal-success');
  const elNombre = document.getElementById('selected-plan-name');
  const elPrecio = document.getElementById('selected-plan-price');

  if (!modalContainer) return;

  if (elNombre) elNombre.textContent = nombre;
  if (elPrecio) elPrecio.textContent = precio;

  if (modalBody) modalBody.classList.remove('hidden');
  if (modalSuccess) modalSuccess.classList.add('hidden');

  modalContainer.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

/**
 * Cierra la ventana modal de pago.
 */
function cerrarModal() {
  const modalContainer = document.getElementById('checkout-modal');
  if (!modalContainer) return;

  modalContainer.classList.add('hidden');
  document.body.style.overflow = '';
}

/**
 * Función global auxiliar para copiar texto al portapapeles (ej. CCI BCP).
 * @param {string} texto - Cadena a copiar.
 */
function copiarTexto(texto) {
  navigator.clipboard.writeText(texto).then(function () {
    alert('Número de cuenta/CCI copiado al portapapeles: ' + texto);
  });
}
