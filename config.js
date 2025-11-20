module.exports = {
  PORT: 3301, // puerto del servidor
  REPETIR: 60000, // precision de notificaciones, cada cuantos milisegundos se comprueban los metas
  MINUTOSAVISO: 10, // 1-59 minutos para avisar antes de la hora del meta
  NTFY_TOPIC: '', // string, tema personalizado de ntfy.sh para las notificaciones
};