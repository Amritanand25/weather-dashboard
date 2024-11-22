import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { ForecastDay } from "../types/weather";

interface ForecastChartProps {
  data: ForecastDay[];
}

export const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  const chartData = data.map((day) => ({
    date: new Date(day.date).toLocaleDateString("en-US", { weekday: "short" }),
    min: day.temperature.min,
    max: day.temperature.max,
  }));

  return (
    <div className="w-full h-80 mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" opacity={0.2} />
          <XAxis
            dataKey="date"
            stroke="#6366f1"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="#6366f1"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}°`}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(13, 18, 29, 0.95)",
              border: "1px solid rgba(99, 102, 241, 0.2)",
              borderRadius: "0.5rem",
              color: "#e5e7eb",
              backdropFilter: "blur(4px)",
            }}
          />
          <Area
            type="monotone"
            dataKey="max"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#colorMax)"
            dot={{ fill: "#6366f1", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: "#818cf8" }}
          />
          <Area
            type="monotone"
            dataKey="min"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#colorMin)"
            dot={{ fill: "#3b82f6", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: "#60a5fa" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
