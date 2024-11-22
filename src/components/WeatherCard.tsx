import React from "react";
import {
  Cloud,
  Droplets,
  Wind,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Cloudy,
} from "lucide-react";
import { WeatherData } from "../types/weather";
import { Clock } from "./Clock";

interface WeatherCardProps {
  data: WeatherData;
}

export const WeatherIcon: React.FC<{ condition: string; isNight: boolean }> = ({
  condition,
  isNight,
}) => {
  const iconProps = {
    size: 48,
    className: `${
      condition === "clear" && !isNight
        ? "sun-icon text-yellow-400"
        : "text-blue-400"
    } transition-all duration-300`,
  };

  switch (condition.toLowerCase()) {
    case "clear":
      return isNight ? <Moon {...iconProps} /> : <Sun {...iconProps} />;
    case "rain":
      return (
        <div className="rain-animation">
          <CloudRain {...iconProps} />
          <div className="rain-drop"></div>
          <div className="rain-drop"></div>
          <div className="rain-drop"></div>
          <div className="rain-drop"></div>
        </div>
      );
    case "snow":
      return <CloudSnow {...iconProps} />;
    case "thunderstorm":
      return <CloudLightning {...iconProps} />;
    case "clouds":
      return <Cloudy {...iconProps} />;
    default:
      return <Cloud {...iconProps} />;
  }
};

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const now = new Date();

  const currentDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isNight = now.getHours() >= 18 || now.getHours() < 6;

  return (
    <div className="weather-card backdrop-blur-lg rounded-2xl p-8 w-full shadow-xl ring-1 ring-indigo-900/30 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
        <div className="flex-1">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
            {data.location}
          </h2>
          <div className="space-y-1 mt-2">
            <p className="text-indigo-200/70">{currentDate}</p>
            <Clock />
          </div>
          <div className="mt-6 text-8xl font-bold text-white tracking-tighter">
            {Math.round(data.temperature)}°
          </div>
          <p className="mt-2 text-xl text-indigo-300/80 capitalize">
            {data.condition}
          </p>
        </div>

        <div className="flex-1 flex justify-center">
          <WeatherIcon condition={data.condition} isNight={isNight} />
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 gap-4">
            <div className="group flex items-center space-x-4 p-4 bg-gray-900/40 rounded-xl backdrop-blur-md transition-all duration-300 hover:bg-gray-800/40">
              <Droplets
                className="text-blue-400 group-hover:scale-110 transition-transform"
                size={24}
              />
              <div>
                <span className="text-sm text-gray-400">Humidity</span>
                <p className="text-lg font-semibold text-blue-400">
                  {data.humidity}%
                </p>
              </div>
            </div>

            <div className="group flex items-center space-x-4 p-4 bg-gray-900/40 rounded-xl backdrop-blur-md transition-all duration-300 hover:bg-gray-800/40">
              <Wind
                className="text-indigo-400 group-hover:scale-110 transition-transform"
                size={24}
              />
              <div>
                <span className="text-sm text-gray-400">Wind Speed</span>
                <p className="text-lg font-semibold text-indigo-400">
                  {data.windSpeed} km/h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
