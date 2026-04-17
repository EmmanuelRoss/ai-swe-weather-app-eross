/*export async function getCoordinates(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.results) throw new Error("Ciudad no encontrada");

  return data.results[0];
}*/

export async function getCoordinates(city) {
  try {
    // 1. Validar input
    if (!city || !city.trim()) {
      throw new Error("Debes ingresar una ciudad válida");
    }

    const cleanCity = city.trim();

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanCity)}&count=1`;

    const resp = await fetch(url);

    // 2. Validar respuesta HTTP
    if (!resp.ok) {
      throw new Error(`Error en geocoding: ${resp.status}`);
    }

    const data = await resp.json();

    // 3. Validar contenido
    if (!data.results || data.results.length === 0) {
      throw new Error("Ciudad no encontrada");
    }

    const location = data.results[0];

    // 4. Retornar estructura limpia
    return {
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      country: location.country
    };

  } catch (error) {
    throw new Error(`Error al obtener coordenadas: ${error.message}`);
  }
}