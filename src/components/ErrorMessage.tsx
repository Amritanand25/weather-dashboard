import React from "react";
import { AlertCircle } from "lucide-react";
import { LocationError } from "../types/weather";

interface ErrorMessageProps {
  error: LocationError;
}

const messages = {
  permission: "Please enable location access to get local weather",
  network: "Unable to fetch weather data. Please check your connection",
  "invalid-city": "City not found. Please try another location",
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div
      className="flex items-center space-x-2 bg-red-500/10 border border-red-500/20 
                    rounded-lg px-4 py-3 text-red-400"
    >
      <AlertCircle size={20} />
      <span>{messages[error.type]}</span>
    </div>
  );
};