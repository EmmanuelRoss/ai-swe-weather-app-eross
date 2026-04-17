/*//main.js - Punto de entrada de la aplicación
import { getCoordinates } from './api/geoService.js';
import { getWeather } from './api/weatherService.js';
import { renderWeather } from './ui/renderWeather.js';
import { showLoading, showError, clearStatus } from './ui/uiState.js';

//Obtener referencia al formulario
const form = document.querySelector('#search-form');

//Escuchar el evento de envío del formulario
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const city = document.querySelector('#city').value;

  try {
    // Mostrar estado de carga mientras se obtienen los datos
    showLoading();

    // Obtener las coordenadas de la ciudad
    const location = await getCoordinates(city);
    //Obtener el clima usando las coordenadas
    const weather = await getWeather(location.latitude, location.longitude);

    //Renderizar resultados y limpiar estados anteriores
    clearStatus();
    renderWeather(weather, location);

  } catch (err) {
    //Mostrar mensaje de error en caso de fallo
    showError(err.message);
  }
});*/

import { getCoordinates } from './api/geoService.js';
import { getWeather } from './api/weatherService.js';
import { renderWeather } from './ui/renderWeather.js';
import { showLoading, showError, clearStatus } from './ui/uiState.js';
import { getCacheData, setCacheData } from './utils/cache.js';

const form = document.querySelector('#search-form');
const cityInput = document.querySelector('#city');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();
  
  if (!city) {
    showError("Por favor ingresa un nombre de ciudad");
    return;
  }

  try {
    showLoading();

    // 🎯 VERIFICAR CACHÉ PRIMERO
    let cachedData = getCacheData(city);
    
    if (cachedData) {
      // Si hay caché válido, usarlo directamente
      console.log("📌 Usando datos en caché");
      clearStatus();
      renderWeather(cachedData.weather, cachedData.location);
      cityInput.value = "";
      return;
    }

    // Si no hay caché válido, obtener de APIs
    console.log("🌐 Obtiendo datos de APIs");
    const location = await getCoordinates(city);
    const weather = await getWeather(location.latitude, location.longitude);

    // 🎯 GUARDAR EN CACHÉ
    setCacheData(city, { location, weather }, 60); // Caché de 60 minutos

    clearStatus();
    renderWeather(weather, location);
    cityInput.value = "";

  } catch (err) {
    showError(err.message);
  }
});