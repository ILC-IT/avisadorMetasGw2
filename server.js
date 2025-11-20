// server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const metas = require('./metas');
const app = express();
const { PORT, MINUTOSAVISO, REPETIR, NTFY_TOPIC } = require('./config');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

let seleccionPorMeta = {};
let minutosAviso = MINUTOSAVISO;
const enviadosHoy = new Set();

// Utilidades
function getCurrentTime() {
  const now = new Date();
  return now.toTimeString().slice(0, 5); // "HH:MM"
}

function cargarSeleccionDesdeArchivo() {
  try {
    const data = fs.readFileSync('seleccion.json', 'utf-8');
    const parsed = JSON.parse(data);
    minutosAviso = parsed.minutosAviso ?? minutosAviso;
    return parsed.seleccion || {};
  } catch (err) {
    return {};
  }
}

function guardarSeleccionEnArchivo({ seleccion, minutosAviso }) {
  try {
    fs.writeFileSync('seleccion.json', JSON.stringify({
      seleccion,
      minutosAviso
    }, null, 2));
  } catch (err) {
    console.error('Error guardando seleccion:', err.message);
  }
}

// Verificacion de metas
async function verificarYNotificar() {
  const ahora = new Date();

  Object.entries(seleccionPorMeta).forEach(([nombre, horasSeleccionadas]) => {
    const meta = metas.find(b => b.nombre === nombre);
    if (!meta) return;

    horasSeleccionadas.forEach(horario => {
      const [h, m] = horario.split(':').map(Number);

      const horaAviso = new Date();
      horaAviso.setHours(h, m - minutosAviso, 0, 0);

      if (
        ahora.getHours() === horaAviso.getHours() &&
        ahora.getMinutes() === horaAviso.getMinutes()
      ) {
        const key = `${nombre}-${horario}`;
        if (!enviadosHoy.has(key)) {
          const mensaje = `⚔️ ${nombre} at ${horario}.\n📍 WP: ${meta.puntoRuta}`;
          enviarNotificacion(mensaje);
          enviadosHoy.add(key);
          console.log(`Notificacion enviada: ${nombre} (${horario})`);
        }
      }
    });
  });
}

// Enviar notificacion NTFY
async function enviarNotificacion(mensaje) {
  try {
    await axios.post(`https://ntfy.sh/${NTFY_TOPIC}`, mensaje, {
      headers: {
        'Title': 'Notify Meta GW2',
        'Priority': 'high'
      }
    });
  } catch (err) {
    console.error(`Error al enviar notificacion: ${err.message}`);
  }
}

// Limpieza diaria de enviadosHoy a las 00:02:30 para evitar que no notifique
// los siguientes dias si se mantiene seleccionado el mismo meta-hora
// Se usan 30 segundos extra para que no coincida con alguna notificacion ya que
// MINUTOSAVISO es un numero entero
function programarLimpiezaDiaria() {
  const ahora = new Date();
  const siguienteLimpieza = new Date(
    ahora.getFullYear(),
    ahora.getMonth(),
    ahora.getDate() + 1,
    0, 2, 30, 0 // 00H:02M:30S AM
  );

  const msHastaLimpieza = siguienteLimpieza - ahora;

  setTimeout(() => {
    enviadosHoy.clear();
    const ahoraLimpieza = new Date();
    console.log(`Limpieza diaria de enviadosHoy realizada a las: ${ahoraLimpieza.toLocaleString()}`);
    programarLimpiezaDiaria(); // Reprogramar para el siguiente dia
  }, msHastaLimpieza);
}

// Iniciar limpieza programada al arrancar
programarLimpiezaDiaria();

// Revision continua
setInterval(verificarYNotificar, REPETIR);

// Cargar seleccion al iniciar
seleccionPorMeta = cargarSeleccionDesdeArchivo();

// API para frontend
app.get('/api/metas', (req, res) => {
  res.json(metas);
});

app.get('/api/config', (req, res) => {
  res.json({
    seleccion: seleccionPorMeta,
    minutosAviso
  });
});

// Guardar configuracion desde frontend
app.post('/guardar-config', (req, res) => {
  const { seleccion, minutosAviso: minutos } = req.body;

  // Validar minutosAviso
  if (typeof minutos !== 'number' || minutos < 1 || minutos > 59) {
    console.warn(`❌ Configuracion rechazada. Valor invalido de MINUTOSAVISO: ${minutos}`);
    return res.status(400).json({ error: 'MINUTOSAVISO debe ser un numero entre 1 y 59.' });
  }

  // Validar seleccion
  if (typeof seleccion !== 'object' || Array.isArray(seleccion)) {
    console.warn(`❌ Configuracion rechazada. Formato invalido de seleccion.`);
    return res.status(400).json({ error: 'seleccion debe ser un objeto valido.' });
  }

  minutosAviso = minutos;
  seleccionPorMeta = seleccion;
  guardarSeleccionEnArchivo({ seleccion: seleccionPorMeta, minutosAviso });

  res.sendStatus(200);
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
