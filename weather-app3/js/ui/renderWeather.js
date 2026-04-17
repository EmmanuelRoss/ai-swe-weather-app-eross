/*export function renderWeather(data, location) {
  const container = document.querySelector('#weather');

  container.innerHTML = `
    <h2>${location.name}</h2>
    <p>${data.temperature}°C</p>
    <p>Viento: ${data.windspeed} km/h</p>
    <p>Humedad: ${data.humidity}%</p>
    <p>Sensación térmica: ${data.apparent_temperature}°C</p>
    <p>Dirección del viento: ${data.wind_direction}°</p>
    <p>Presión: ${data.pressure} hPa</p>
    <p>Precipitación: ${data.precipitation} mm/h</p>
    <p>Nubosidad: ${data.cloud_cover}%</p>
    <p>Índice UV: ${data.uv_index}</p>
    <p>Visibilidad: ${data.visibility} m</p>
  `;

  container.classList.remove('hidden');
}*/

import {
  formatTemperature,
  formatApparentTemp,
  formatHumidity,
  formatWindSpeed,
  formatWindDirection,
  formatPressure,
  formatPrecipitation,
  formatCloudCover,
  formatUVIndex,
  formatVisibility,
  getWeatherDescription
} from '../utils/formatters.js';

const weatherContainer = document.querySelector('#weather');

/**
 * Renderiza todos los datos meteorológicos en la interfaz
 * @param {Object} data - Datos del clima
 * @param {Object} location - Información de ubicación
 */
export function renderWeather(data, location) {
  const weatherDesc = getWeatherDescription(data.weather_code);
  const apparent = formatApparentTemp(data.apparent_temperature);
  const temp = formatTemperature(data.temperature);
  const humidity = formatHumidity(data.humidity);
  const wind = formatWindSpeed(data.windspeed);
  const windDir = formatWindDirection(data.wind_direction);
  const pressure = formatPressure(data.pressure);
  const precip = formatPrecipitation(data.precipitation);
  const clouds = formatCloudCover(data.cloud_cover);
  const uv = formatUVIndex(data.uv_index);
  const vis = formatVisibility(data.visibility);

  // Obtener hora actual para mostrar cuándo se obtuvo el dato
  const now = new Date().toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  weatherContainer.innerHTML = `
    <div class="weather-info">
      <!-- Header: Ciudad y hora -->
      <div class="weather-header">
        <h2>📍 ${location.name}, ${location.country}</h2>
        <p class="weather-time">Actualizado: ${now}</p>
      </div>

      <!-- Condición principal -->
      <div class="weather-main">
        <div class="condition">
          <span class="emoji">${weatherDesc.emoji}</span>
          <span class="description">${weatherDesc.desc}</span>
        </div>
      </div>

      <!-- Temperatura principal -->
      <div class="temperature-box">
        <div class="actual-temp">
          <span class="value">${temp}</span>
          <span class="label">Temperatura</span>
        </div>
        <div class="apparent-temp">
          <span class="value">${apparent}</span>
          <span class="label">Se siente como</span>
        </div>
      </div>

      <!-- Grid de variables -->
      <div class="weather-grid">
        <!-- Fila 1 -->
        <div class="weather-item">
          <span class="icon">💨</span>
          <span class="label">Viento</span>
          <span class="value">${wind}</span>
          <span class="detail">${windDir}</span>
        </div>

        <div class="weather-item">
          <span class="icon">💧</span>
          <span class="label">Humedad</span>
          <span class="value">${humidity}</span>
        </div>

        <!-- Fila 2 -->
        <div class="weather-item">
          <span class="icon">🌡️</span>
          <span class="label">Presión</span>
          <span class="value">${pressure}</span>
        </div>

        <div class="weather-item">
          <span class="icon">🌧️</span>
          <span class="label">Precipitación</span>
          <span class="value">${precip}</span>
        </div>

        <!-- Fila 3 -->
        <div class="weather-item">
          <span class="icon">☁️</span>
          <span class="label">Nubes</span>
          <span class="value">${clouds}</span>
        </div>

        <div class="weather-item">
          <span class="icon">🌞</span>
          <span class="label">Índice UV</span>
          <span class="value">${uv}</span>
        </div>

        <!-- Fila 4 -->
        <div class="weather-item full-width">
          <span class="icon">👁️</span>
          <span class="label">Visibilidad</span>
          <span class="value">${vis}</span>
        </div>
      </div>
    </div>
  `;

  weatherContainer.classList.remove('hidden');
}

export function clearWeather() {
  weatherContainer.classList.add('hidden');
}