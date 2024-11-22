import axios from 'axios';
import { API_KEY, BASE_URL } from '../data/api';

export const getWeatherData = async (city: string) => {

  try {
    const currentWeather = await axios.get(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    const forecast = await axios.get(
      `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );

    const dailyForecasts = forecast.data.list
      .filter((_: any, index: number) => index % 8 === 0)
      .slice(0, 5)
      .map((item: any) => ({
        date: item.dt_txt.split(' ')[0],
        temperature: {
          min: Math.round(item.main.temp_min),
          max: Math.round(item.main.temp_max)
        },
        condition: item.weather[0].main.toLowerCase()
      }));

    return {
      location: currentWeather.data.name,
      temperature: Math.round(currentWeather.data.main.temp),
      condition: currentWeather.data.weather[0].main.toLowerCase(),
      humidity: currentWeather.data.main.humidity,
      windSpeed: Math.round(currentWeather.data.wind.speed * 3.6), // Convert m/s to km/h
      forecast: dailyForecasts
    };

  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw { type: 'invalid-city', message: 'City not found' };
    }
    throw { type: 'network', message: 'Failed to fetch weather data' };
  }
};