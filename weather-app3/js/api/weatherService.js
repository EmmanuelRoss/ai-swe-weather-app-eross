/*export async function getWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  const res = await fetch(url);
  const data = await res.json();

  return data.current_weather;
}*/

export async function getWeather(lat, lon){
  try{
    /*const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;*/
    /*const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,windspeed_10m,relative_humidity_2m,apparent_temperature,weathercode`;*/
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,windspeed_10m,relative_humidity_2m,apparent_temperature,precipitation,weathercode,wind_direction_10m,pressure_msl,cloud_cover,uv_index,visibility`;
    
    const res = await fetch(url);

    //1. Validar estado HTTP    
    if(!res.ok){
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data = await res.json();

    //2. Validar estructura de datos
    /*if(!data.current_weather){*/
    if(!data.current){
      throw new Error('Datos de clima no encontrados en la respuesta');
    }

    //3. Validar tipos de datos
    return {
      /*temperature: data.current.temperature_2m,
      windspeed: data.current.windspeed_10m,
      humidity: data.current.relative_humidity_2m,
      feelsLike: data.current.apparent_temperature,
      weatherCode: data.current.weathercode*/
      temperature: data.current.temperature_2m,
      apparent_temperature: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      windspeed: data.current.windspeed_10m,
      wind_direction: data.current.wind_direction_10m,
      pressure: data.current.pressure_msl,
      precipitation: data.current.precipitation,
      weather_code: data.current.weather_code,
      cloud_cover: data.current.cloud_cover,
      uv_index: data.current.uv_index,
      visibility: data.current.visibility
    };
  }catch(err){
    //4. Mejorar manejo de errores
    throw new Error(`Error al obtener el clima: ${err.message}`);
  }
}