/**
 * Formatea la temperatura
 * @param {number} temp - Temperatura en Celsius
 * @returns {string} Temperatura formateada
 */
export function formatTemperature(temp) {
  return `${Math.round(temp)}°C`;
}

/**
 * Formatea la temperatura aparente
 * @param {number} temp - Temperatura aparente
 * @returns {string} Formateada con ícono
 */
export function formatApparentTemp(temp) {
  return `${Math.round(temp)}°C`;
}

/**
 * Formatea humedad relativa
 * @param {number} humidity - Humedad en porcentaje
 * @returns {string} Formateada
 */
export function formatHumidity(humidity) {
  if (humidity < 30) return `${humidity}% (Seco)`;
  if (humidity < 60) return `${humidity}% (Normal)`;
  if (humidity < 80) return `${humidity}% (Húmedo)`;
  return `${humidity}% (Muy húmedo)`;
}

/**
 * Formatea velocidad del viento
 * @param {number} speed - Velocidad en km/h
 * @returns {string} Velocidad formateada
 */
export function formatWindSpeed(speed) {
  return `${Math.round(speed)} km/h`;
}

/**
 * Obtiene dirección del viento en texto
 * @param {number} degrees - Grados (0-360)
 * @returns {string} Dirección (N, NE, E, SE, S, SO, O, NO)
 */
export function getWindDirection(degrees) {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
                      'S', 'SSO', 'SO', 'OSO', 'O', 'ONO', 'NO', 'NNO'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

/**
 * Formatea dirección del viento
 * @param {number} degrees - Grados
 * @returns {string} "NO (310°)"
 */
export function formatWindDirection(degrees) {
  const direction = getWindDirection(degrees);
  return `${direction} (${Math.round(degrees)}°)`;
}

/**
 * Formatea presión atmosférica
 * @param {number} pressure - Presión en hPa
 * @returns {string} Formateada
 */
export function formatPressure(pressure) {
  return `${Math.round(pressure)} hPa`;
}

/**
 * Formatea precipitación
 * @param {number} precip - Precipitación en mm
 * @returns {string} Formateada
 */
export function formatPrecipitation(precip) {
  if (precip === 0) return "Sin lluvia";
  return `${precip} mm`;
}

/**
 * Formatea cobertura de nubes
 * @param {number} cloudCover - Porcentaje
 * @returns {string} Formateada con descripción
 */
export function formatCloudCover(cloudCover) {
  if (cloudCover < 10) return `${cloudCover}% (Despejado)`;
  if (cloudCover < 50) return `${cloudCover}% (Parcialmente nublado)`;
  if (cloudCover < 90) return `${cloudCover}% (Nublado)`;
  return `${cloudCover}% (Muy nublado)`;
}

/**
 * Formatea índice UV
 * @param {number} uvIndex - Índice UV
 * @returns {string} Formateada con nivel de riesgo
 */
export function formatUVIndex(uvIndex) {
  if (uvIndex < 3) return `${uvIndex} (Bajo)`;
  if (uvIndex < 6) return `${uvIndex} (Moderado)`;
  if (uvIndex < 8) return `${uvIndex} (Alto)`;
  if (uvIndex < 11) return `${uvIndex} (Muy alto)`;
  return `${uvIndex} (Extremo)`;
}

/**
 * Formatea visibilidad
 * @param {number} visibility - Visibilidad en metros
 * @returns {string} Formateada
 */
export function formatVisibility(visibility) {
  if (visibility >= 1000) {
    return `${(visibility / 1000).toFixed(1)} km`;
  }
  return `${Math.round(visibility)} m`;
}

/**
 * Interpreta código de clima
 * @param {number} code - Código WMO
 * @returns {Object} { emoji, descripción }
 */
export function getWeatherDescription(code) {
  const weatherCodes = {
    0: { emoji: '☀️', desc: 'Despejado' },
    1: { emoji: '🌤️', desc: 'Principalmente despejado' },
    2: { emoji: '⛅', desc: 'Parcialmente nublado' },
    3: { emoji: '☁️', desc: 'Nublado' },
    45: { emoji: '🌫️', desc: 'Niebla' },
    48: { emoji: '🌫️', desc: 'Niebla con escarcha' },
    51: { emoji: '🌦️', desc: 'Llovizna ligera' },
    53: { emoji: '🌦️', desc: 'Llovizna' },
    55: { emoji: '🌧️', desc: 'Llovizna densa' },
    61: { emoji: '🌧️', desc: 'Lluvia ligera' },
    63: { emoji: '🌧️', desc: 'Lluvia' },
    65: { emoji: '⛈️', desc: 'Lluvia fuerte' },
    71: { emoji: '❄️', desc: 'Nieve ligera' },
    73: { emoji: '❄️', desc: 'Nieve' },
    75: { emoji: '❄️', desc: 'Nieve fuerte' },
    77: { emoji: '❄️', desc: 'Granos de nieve' },
    80: { emoji: '🌧️', desc: 'Lluvia moderada' },
    81: { emoji: '🌧️', desc: 'Lluvia fuerte' },
    82: { emoji: '⛈️', desc: 'Lluvia muy fuerte' },
    85: { emoji: '❄️', desc: 'Lluvia de nieve' },
    86: { emoji: '❄️', desc: 'Lluvia de nieve fuerte' },
    95: { emoji: '⛈️', desc: 'Tormenta' },
    96: { emoji: '⛈️', desc: 'Tormenta con granizo' },
    99: { emoji: '⛈️', desc: 'Tormenta con granizo fuerte' }
  };

  return weatherCodes[code] || { emoji: '🌍', desc: 'Desconocido' };
}

/**
 * Formatea ubicación
 * @param {string} name - Nombre de la ciudad
 * @param {string} country - País
 * @returns {string} Ubicación completa
 */
export function formatLocation(name, country) {
  return `${name}, ${country}`;
}