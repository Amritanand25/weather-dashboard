import React, { useEffect, useState, lazy, Suspense, useRef } from "react";
import { SearchBar } from "./components/SearchBar";
import { ErrorMessage } from "./components/ErrorMessage";
import { WeatherData, LocationError } from "./types/weather";
import { CloudMoon } from "lucide-react";
import { getWeatherData } from "./services/weather";
import Autosuggestion from "./components/AutoSuggestion";
import { getCityList } from "./services/city";

const WeatherCard = lazy(() => import("./components/WeatherCard"));
const ForecastChart = lazy(() => import("./components/ForecastChart"));

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<LocationError | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [hideAutoComplete, setHideAutoComplete] = useState<boolean>(false);

  const ref = useRef<boolean>(false);
  const cityRef = useRef<boolean>(false);

  const fetchWeather = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData(city);
      setWeatherData(data);
      localStorage.setItem("lastCity", city);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ref.current) return;
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      fetchWeather(lastCity);
    } else {
      fetchWeather("London");
    }
    ref.current = true;
  }, []);

  useEffect(() => {
    if (cityRef?.current) return;
    const fetchCities = async () => {
      const cityList = await getCityList();
      setCities(cityList);
      console.log(cityList);
    };
    fetchCities();
    cityRef.current = true;
  }, []);

  const onSearchKeyupHandle = (city: string) => {
    setCity(city);
    setHideAutoComplete(false);
  };

  const onSelectSuggestion = (selectedCity: string) => {
    setCity(selectedCity);
    setHideAutoComplete(true);
    fetchWeather(selectedCity);
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex items-center space-x-3 mb-4">
            <CloudMoon size={36} className="text-indigo-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
              Weather Dashboard
            </h1>
          </div>

          <div className="mb-4 w-full flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <SearchBar
                value={city}
                onSearch={fetchWeather}
                onKeyup={onSearchKeyupHandle}
              />
              {city && !hideAutoComplete && (
                <Autosuggestion
                  suggestions={cities}
                  onSelect={onSelectSuggestion}
                  query={city}
                />
              )}
            </div>
          </div>

          {loading ? (
            <React.Fragment>
              <div className="animate-pulse flex space-x-4 w-full max-w-4xl">
                <div className="w-full h-80 bg-gray-800/30 rounded-2xl"></div>
              </div>
              <div className="animate-pulse flex space-x-4 w-full max-w-4xl">
                <div className="w-full h-96 bg-gray-800/30 rounded-2xl"></div>
              </div>
            </React.Fragment>
          ) : error ? (
            <ErrorMessage error={error} />
          ) : weatherData ? (
            <div className="w-full max-w-4xl space-y-6">
              <Suspense fallback={<div>Loading...</div>}>
                <WeatherCard data={weatherData} />
              </Suspense>
              <div className="forecast-card rounded-2xl p-6 shadow-xl backdrop-blur-lg">
                <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
                  5-Day Forecast
                </h3>
                <Suspense fallback={<div>Loading...</div>}>
                  <ForecastChart data={weatherData.forecast} />
                </Suspense>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
