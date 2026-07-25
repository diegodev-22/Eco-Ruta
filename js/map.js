
document.addEventListener('DOMContentLoaded', function () {
  inicializarMapaEcoRuta();
});

/**
 * Carga e inicializa el mapa interactivo centrado en Lima Norte con marcadores personalizados.
 */
function inicializarMapaEcoRuta() {
  const contenedorMapa = document.getElementById('map-container');
  if (!contenedorMapa) return;

  // Coordenadas centrales de Lima Norte (Los Olivos / Comas / SMP)
  const centroLimaNorte = [-11.9850, -77.0620];
  const mapa = L.map('map-container', {
    center: centroLimaNorte,
    zoom: 12,
    scrollWheelZoom: false
  });

  // Recalcular tamaño del mapa al redimensionar la ventana o girar dispositivo
  window.addEventListener('resize', function () {
    mapa.invalidateSize();
  });

  // Capa base de azulejos de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contribuidores | EcoRuta Perú'
  }).addTo(mapa);

  // Icono SVG personalizado para los marcadores de EcoRuta
  const iconoEcoRuta = L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="background-color: #1b4332; width: 34px; height: 34px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
        <div style="width: 12px; height: 12px; background-color: #d96b43; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18]
  });

  // Listado de puntos y rutas operativas de EcoRuta en Lima Norte
  const puntosRuta = [
    {
      lat: -11.9725,
      lng: -77.0700,
      titulo: 'Ruta Los Olivos Norte',
      distrito: 'Los Olivos (Pro / Urb. Sol de Oro)',
      asociacion: 'Asoc. Recicladores Senor de los Milagros',
      horario: 'Lunes, Miercoles y Viernes (8:00 AM - 1:00 PM)',
      estado: 'Ruta Activa',
      residuos: 'Papel, Carton, PET y Latas'
    },
    {
      lat: -11.9480,
      lng: -77.0490,
      titulo: 'Punto de Acopio Tupac Amaru',
      distrito: 'Comas (Av. Tupac Amaru Km 11)',
      asociacion: 'Cooperativa Ecolim@ Comas',
      horario: 'Martes y Jueves (9:00 AM - 3:00 PM)',
      estado: 'Punto Fijo',
      residuos: 'Vidrio, Plastico Duro y Metal'
    },
    {
      lat: -12.0010,
      lng: -77.0580,
      titulo: 'Ruta Zona Industrial Independencia',
      distrito: 'Independencia (Cerca a Megaplaza)',
      asociacion: 'Asociacion Mujeres Emprendedoras del Reciclaje',
      horario: 'Diario (7:00 AM - 11:00 AM)',
      estado: 'Ruta Comercial',
      residuos: 'Carton Comercial y Archivo Muerto'
    },
    {
      lat: -12.0150,
      lng: -77.0820,
      titulo: 'Red de Bodegas Sostenibles SMP',
      distrito: 'San Martin de Porres (Av. Peru)',
      asociacion: 'Red de Segregadores Aliados SMP',
      horario: 'Sabados y Domingos (8:30 AM - 12:30 PM)',
      estado: 'Red de Bodegas',
      residuos: 'Botellas PET y Empaques Flexibles'
    },
    {
      lat: -11.9120,
      lng: -77.0320,
      titulo: 'Estacion Central Carabayllo',
      distrito: 'Carabayllo (San Pedro)',
      asociacion: 'Asociacion Sostenible Lima Norte',
      horario: 'Lunes a Viernes (8:00 AM - 4:00 PM)',
      estado: 'Centro de Segregacion',
      residuos: 'Todos los reciclables limpios y secos'
    }
  ];

  // Agregar marcadores y ventanas emergentes al mapa
  puntosRuta.forEach(function (punto) {
    const contenidoPopup = `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px;">
        <span class="custom-popup-badge">${punto.estado}</span>
        <h4 class="custom-popup-title">${punto.titulo}</h4>
        <p style="margin: 4px 0; font-size: 13px; color: #4a5d52;"><strong>Distrito:</strong> ${punto.distrito}</p>
        <p style="margin: 4px 0; font-size: 13px; color: #4a5d52;"><strong>Aliados:</strong> ${punto.asociacion}</p>
        <p style="margin: 4px 0; font-size: 13px; color: #4a5d52;"><strong>Horario:</strong> ${punto.horario}</p>
        <p style="margin: 4px 0; font-size: 13px; color: #1b4332;"><strong>Acepta:</strong> ${punto.residuos}</p>
      </div>
    `;

    L.marker([punto.lat, punto.lng], { icon: iconoEcoRuta })
      .addTo(mapa)
      .bindPopup(contenidoPopup);
  });
}
