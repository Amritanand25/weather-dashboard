import React, { useState, useEffect } from "react";
import { Clock as ClockIcon } from "lucide-react";

export const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex items-center space-x-2 text-indigo-200/70">
      <ClockIcon size={16} className="text-indigo-400" />
      <span className="font-medium tracking-wide">{formattedTime}</span>
    </div>
  );
};
