const zonaHoraria = -new Date().getTimezoneOffset() / 60;
const diferenciaHoras = zonaHoraria - 2; // NO CAMBIAR. Los horarios de las varibales están en UTC+2

function ajustarHora(horaStr, diff) {
  let [h, m] = horaStr.split(":").map(Number);
  h = (h + diff + 24) % 24;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function ordenarHoras(horas) {
  return horas.slice().sort((a, b) => {
    const [ha, ma] = a.split(':').map(Number);
    const [hb, mb] = b.split(':').map(Number);
    return (ha * 60 + ma) - (hb * 60 + mb);
  });
}

const eventosOriginales = [
  {
    nombre: "Verdant Brink",
    horarios: ["00:09", "02:09", "04:09", "06:09", "08:09", "10:09", "12:09", "14:09" , "16:09", "18:09", "20:09", "22:09"],
    puntoRuta: "[&BAgIAAA=]"
  },
  {
    nombre: "Tangled Depths",
    horarios: ["00:30", "02:30", "04:30", "06:30", "08:30", "10:30", "12:30", "14:30" , "16:30", "18:30", "20:30", "22:30"],
    puntoRuta: "[&BPUHAAA=]"
  },
    {
    nombre: "Auric Basin",
    horarios: ["01:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00" , "17:00", "19:00", "21:00", "23:00"],
    puntoRuta: "[&BGwIAAA=]"
  },
  {
    nombre: "Dragon's Stand",
    horarios: ["01:30", "03:30", "05:30", "07:30", "09:30", "11:30", "13:30", "15:30" , "17:30", "19:30", "21:30", "23:30"],
    puntoRuta: "[&BBAIAAA=]"
  },
  {
    nombre: "Pinata",
    horarios: ["00:05", "02:05", "04:05", "06:05", "08:05", "10:05", "12:05", "14:05", "16:05", "18:05", "20:05", "22:05"],
    puntoRuta: "[&BLsKAAA=]"
  },
  {
    nombre: "Desert Highlands",
    horarios: ["01:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00", "23:00"],
    puntoRuta: "[&BGsKAAA=]"
  },
    {
    nombre: "Elon Riverlands",
    horarios: ["01:30", "03:30", "05:30", "07:30", "09:30", "11:30", "13:30", "15:30", "17:30", "19:30", "21:30", "23:30"],
    puntoRuta: "[&BFMKAAA=]"
  },
  {
    nombre: "The Desolation Maws",
    horarios: ["01:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00", "23:00"],
    puntoRuta: "[&BKMKAAA=]"
  },
  {
    nombre: "The Desolation Junundu",
    horarios: ["00:30", "01:30", "02:30", "03:30", "04:30", "05:30", "06:30", "07:30", "08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:30", "23:30"],
    puntoRuta: "[&BMEKAAA=]"
  },
    {
    nombre: "Domain of Vabbi Dogs",
    horarios: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
    puntoRuta: "[&BO0KAAA=]"
  },
  {
    nombre: "Domain of Vabbi Serpent's Ire",
    horarios: ["00:30", "02:30", "04:30", "06:30", "08:30", "10:30", "12:30", "14:30", "16:30", "18:30", "20:30", "22:30"],
    puntoRuta: "[&BHQKAAA=]"
  },
  {
    nombre: "Istan Palawadan",
    horarios: ["01:45", "03:45", "05:45", "07:45", "09:45", "11:45", "13:45", "15:45", "17:45", "19:45", "21:45", "23:45"],
    puntoRuta: "[&BAkLAAA=]"
  },
  {
    nombre: "Jahai DBS",
    horarios: ["01:15", "03:15", "05:15", "07:15", "09:15", "11:15", "13:15", "15:15", "17:15", "19:15", "21:15", "23:15"],
    puntoRuta: "[&BJMLAAA=]"
  },
  {
    nombre: "Thunderhead Peaks North",
    horarios: ["01:45", "03:45", "05:45", "07:45", "09:45", "11:45", "13:45", "15:45", "17:45", "19:45", "21:45", "23:45"],
    puntoRuta: "[&BLsLAAA=]"
  },
  {
    nombre: "Thunderhead Peaks South",
    horarios: ["00:45", "02:45", "04:45", "06:45", "08:45", "10:45", "12:45", "14:45", "16:45", "18:45", "20:45", "22:45"],
    puntoRuta: "[&BKYLAAA=]"
  },
  {
    nombre: "Grothmar Valley Ooze",
    horarios: ["01:05", "03:05", "05:05", "07:05", "09:05", "11:05", "13:05", "15:05", "17:05", "19:05", "21:05", "23:05"],
    puntoRuta: "[&BPgLAAA=]"
  },
  {
    nombre: "Grothmar Valley Metal Concert",
    horarios: ["01:40", "03:40", "05:40", "07:40", "09:40", "11:40", "13:40", "15:40", "17:40", "19:40", "21:40", "23:40"],
    puntoRuta: "[&BPgLAAA=]"
  },
  {
    nombre: "Grothmar Valley Effigy",
    horarios: ["00:10", "02:10", "04:10", "06:10", "08:10", "10:10", "12:10", "14:10", "16:10", "18:10", "20:10", "22:10"],
    puntoRuta: "[&BA4MAAA=]"
  },
  {
    nombre: "Grothmar Valley Doomlore",
    horarios: ["00:38", "02:38", "04:38", "06:38", "08:38", "10:38", "12:38", "14:38", "16:38", "18:38", "20:38", "22:38"],
    puntoRuta: "[&BA4MAAA=]"
  },
  {
    nombre: "Bjora Joras's Keep",
    horarios: ["01:45", "03:45", "05:45", "07:45", "09:45", "11:45", "13:45", "15:45", "17:45", "19:45", "21:45", "23:45"],
    puntoRuta: "[&BCcMAAA=]"
  },
  {
    nombre: "Seitung Province",
    horarios: ["01:30", "03:30", "05:30", "07:30", "09:30", "11:30", "13:30", "15:30", "17:30", "19:30", "21:30", "23:30"],
    puntoRuta: "[&BGUNAAA=]"
  },
  {
    nombre: "New Kaineng City",
    horarios: ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
    puntoRuta: "[&BBkNAAA=]"
  },
  {
    nombre: "The Echovald Wilds Gang War",
    horarios: ["00:30", "02:30", "04:30", "06:30", "08:30", "10:30", "12:30", "14:30", "16:30", "18:30", "20:30", "22:30"],
    puntoRuta: "[&BMwMAAA=]"
  },
  {
    nombre: "The Echovald Wilds Turtles",
    horarios: ["01:40", "03:40", "05:40", "07:40", "09:40", "11:40", "13:40", "15:40", "17:40", "19:40", "21:40", "23:40"],
    puntoRuta: "[&BPkMAAA=]"
  },
  {
    nombre: "Dragon's End",
    horarios: ["01:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00", "23:00"],
    puntoRuta: "[&BKIMAAA=]"
  },
  {
    nombre: "Skywatch Archipelago",
    horarios: ["01:00", "03:00", "05:00", "07:00", "09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00", "23:00"],
    puntoRuta: "[&BL4NAAA=]"
  },
  {
    nombre: "Amnytas",
    horarios: ["00:00", "02:00", "04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
    puntoRuta: "[&BDQOAAA=]"
  },
  {
    nombre: "Janthir Syntri",
    horarios: ["00:30", "02:30", "04:30", "06:30", "08:30", "10:30", "12:30", "14:30", "16:30", "18:30", "20:30", "22:30"],
    puntoRuta: "[&BCoPAAA=]"
  },
  {
    nombre: "Bava Nisos",
    horarios: ["01:20", "03:20", "05:20", "07:20", "09:20", "11:20", "13:20", "15:20", "17:20", "19:20", "21:20", "23:20"],
    puntoRuta: "[&BGEPAAA=]"
  },
  {
    nombre: "Shipwreck Strand",
    horarios: ["00:40", "02:40", "04:40", "06:40", "08:40", "10:40", "12:40", "14:40", "16:40", "18:40", "20:40", "22:40"],
    puntoRuta: "[&BJEPAAA=]"
  },
  {
    nombre: "Starlit Weald",
    horarios: ["01:40", "03:40", "05:40", "07:40", "09:40", "11:40", "13:40", "15:40", "17:40", "19:40", "21:40", "23:40"],
    puntoRuta: "[&BJ4PAAA=]"
  },
  {
    nombre: "Convergence Soto",
    horarios: ["00:30", "03:30", "06:30", "09:30", "12:30", "15:30", "18:30", "21:30"],
    puntoRuta: "[&BB8OAAA=]"
  },
  {
    nombre: "Convergence JW",
    horarios: ["02:00", "05:00", "08:00", "11:00", "14:00", "17:00", "20:00", "23:00"],
    puntoRuta: "[&BK4OAAA=]"
  }
];

// Creacion de eventosOriginales con las horas ajustada SIN modificar la variable original
const eventosAjustados = eventosOriginales.map(evento => {
  const horariosAjustados = evento.horarios.map(hora => ajustarHora(hora, diferenciaHoras));
  return {
    ...evento,
    horarios: ordenarHoras(horariosAjustados)
  };
});

module.exports = eventosAjustados;
