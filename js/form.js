
document.addEventListener('DOMContentLoaded', function () {
  inicializarValidacionFormulario();
});

/**
 * Evento principal para capturar el envio del formulario de contacto y validar sus datos.
 */
function inicializarValidacionFormulario() {
  const formulario = document.getElementById('contact-form');
  const mensajeExito = document.getElementById('form-success-alert');

  if (!formulario) return;

  const campoNombre = document.getElementById('form-nombre');
  const campoEmail = document.getElementById('form-email');
  const campoRol = document.getElementById('form-rol');
  const campoMensaje = document.getElementById('form-mensaje');

  // Limpiar errores en tiempo real al interactuar con los campos
  if (campoNombre) {
    campoNombre.addEventListener('input', function () {
      if (campoNombre.value.trim().length >= 3) ocultarError('error-nombre');
    });
  }
  if (campoEmail) {
    campoEmail.addEventListener('input', function () {
      if (validarFormatoCorreo(campoEmail.value.trim())) ocultarError('error-email');
    });
  }
  if (campoRol) {
    campoRol.addEventListener('change', function () {
      if (campoRol.value) ocultarError('error-rol');
    });
  }
  if (campoMensaje) {
    campoMensaje.addEventListener('input', function () {
      if (campoMensaje.value.trim().length >= 10) ocultarError('error-mensaje');
    });
  }

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    let esValido = true;

    // Validar Campo Nombre
    if (!campoNombre.value.trim() || campoNombre.value.trim().length < 3) {
      mostrarError('error-nombre', 'Por favor ingresa tu nombre completo (mínimo 3 caracteres).');
      esValido = false;
    } else {
      ocultarError('error-nombre');
    }

    // Validar Campo Email
    if (!validarFormatoCorreo(campoEmail.value.trim())) {
      mostrarError('error-email', 'Por favor ingresa un correo electrónico válido.');
      esValido = false;
    } else {
      ocultarError('error-email');
    }

    // Validar Campo Rol
    if (!campoRol.value) {
      mostrarError('error-rol', 'Por favor selecciona cómo deseas participar.');
      esValido = false;
    } else {
      ocultarError('error-rol');
    }

    // Validar Campo Mensaje
    if (!campoMensaje.value.trim() || campoMensaje.value.trim().length < 10) {
      mostrarError('error-mensaje', 'Ingresa un mensaje de al menos 10 caracteres.');
      esValido = false;
    } else {
      ocultarError('error-mensaje');
    }

    // Si todo es valido, mostrar confirmacion de registro
    if (esValido) {
      formulario.reset();
      if (mensajeExito) {
        mensajeExito.classList.remove('hidden');
        mensajeExito.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(function () {
          mensajeExito.classList.add('hidden');
        }, 8000);
      }
    }
  });
}

/**
 * Comprueba si una cadena tiene formato valido de correo electronico mediante expresion regular.
 * @param {string} correo - Cadena de correo electronico a evaluar.
 * @returns {boolean} True si coincide con el formato de correo.
 */
function validarFormatoCorreo(correo) {
  const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return expresionRegular.test(correo);
}

/**
 * Muestra el mensaje de error asignado a un elemento especifico.
 * @param {string} idElemento - ID del contenedor de mensaje de error.
 * @param {string} textoMensaje - Descripcion del error a mostrar.
 */
function mostrarError(idElemento, textoMensaje) {
  const el = document.getElementById(idElemento);
  if (el) {
    el.textContent = textoMensaje;
    el.style.display = 'block';
  }
}

/**
 * Oculta el mensaje de error de un elemento especifico.
 * @param {string} idElemento - ID del contenedor de mensaje de error.
 */
function ocultarError(idElemento) {
  const el = document.getElementById(idElemento);
  if (el) {
    el.style.display = 'none';
  }
}
