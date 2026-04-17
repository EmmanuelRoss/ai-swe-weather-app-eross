/**
 * Sistema de cache simple para almacenar datos de clima por ubicación.
 * Almacena datos en localStorage con una marca de tiempo para validar su vigencia. Y evita llamadas repetidas a la API si los datos son recientes.
 */

/**
 * Genera una clave de caché única para una ciudad
 * @param {string} city - Nombre de la ciudad
 * @returns {string} Clave única
 */

function generateCacheKey(city) {
  return `weather_${city.toLowerCase()}`;
}

/**
 * Guarda datos del clima en caché
 * @param {string} city - Nombre de la ciudad
 * @param {object} data - Datos a guardar (location + weather + time)
 * @param {number} ttl - Tiempo de vida en minutos (default: 60)
 */
export function setCacheData(city, data, ttl = 60) {
  const key = generateCacheKey(city);
  const cacheEntry = {
    data: data,
    timestamp: Date.now(),
    ttl: ttl * 60 * 1000 // Convertir a milisegundos
  };

  try {
    localStorage.setItem(key, JSON.stringify(cacheEntry));
    console.log(`✅ Datos cacheados para ${city} (${ttl} min)`);
  } catch (err) {
    console.error("❌ Error al guardar en caché:", err);
  }
}

/**
 * Obtiene datos de caché si existen y son válidos
 * @param {string} city - Nombre de la ciudad
 * @returns {Object|null} Datos cacheados o null si no existen/expiraron
 */
export function getCacheData(city) {
  const key = generateCacheKey(city);

  try {
    const cached = localStorage.getItem(key);

    if (!cached) {
      return null; // No hay caché
    }

    const cacheEntry = JSON.parse(cached);
    const now = Date.now();
    const age = now - cacheEntry.timestamp;

    // Verificar si el caché sigue siendo válido
    if (age > cacheEntry.ttl) {
      // Caché expirado, eliminarlo
      localStorage.removeItem(key);
      console.log(`⏰ Caché expirado para ${city}`);
      return null;
    }

    // Caché válido
    const remainingMinutes = Math.floor((cacheEntry.ttl - age) / 60000);
    console.log(`📌 Usando caché para ${city} (válido ${remainingMinutes} min más)`);
    return cacheEntry.data;

  } catch (err) {
    console.error("❌ Error al leer caché:", err);
    return null;
  }
}

/**
 * Limpia el caché de una ciudad específica
 * @param {string} city - Nombre de la ciudad (si no se proporciona, limpia todo)
 */
export function clearCache(city = null) {
  try {
    if (city) {
      const key = generateCacheKey(city);
      localStorage.removeItem(key);
      console.log(`🗑️ Caché limpiado para ${city}`);
    } else {
      // Limpiar todo lo relacionado con weather
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('weather_')) {
          localStorage.removeItem(key);
        }
      });
      console.log(`🗑️ Todo el caché limpiado`);
    }
  } catch (err) {
    console.error("❌ Error al limpiar caché:", err);
  }
}

/**
 * Obtiene el tamaño del caché en KB
 * @returns {number} Tamaño en KB
 */
export function getCacheSize() {
  let size = 0;
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('weather_')) {
        size += localStorage.getItem(key).length;
      }
    });
    return (size / 1024).toFixed(2);
  } catch (err) {
    return 0;
  }
}

/**
 * Lista todas las ciudades cacheadas
 * @returns {Array} Array de ciudades
 */
export function getCachedCities() {
  const cities = [];
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('weather_')) {
        const city = key.replace('weather_', '');
        cities.push(city);
      }
    });
  } catch (err) {
    console.error("❌ Error al listar ciudades cacheadas:", err);
  }
  return cities;
}