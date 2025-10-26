"use client";
import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { Feature } from "geojson";
import { useTheme } from "./ThemeContext"; 

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface Location {
  name: string;
  coordinates: [number, number];
  revenue: number;
}

const locations: Location[] = [
  { name: "New York", coordinates: [-74.006, 40.7128], revenue: 72000 },
  { name: "San Francisco", coordinates: [-122.4194, 37.7749], revenue: 39000 },
  { name: "Sydney", coordinates: [151.2093, -33.8688], revenue: 25000 },
  { name: "Singapore", coordinates: [103.8198, 1.3521], revenue: 61000 },
];

export function RevenueMap() {
  const [selected, setSelected] = useState<Location | null>(null);
  const { theme } = useTheme();
  const maxRevenue = Math.max(...locations.map((l) => l.revenue));

  const isLight = theme === "light";

  return (
    <div
      className={`p-5 rounded-2xl shadow-lg w-full max-w-2xl mx-auto transition-colors duration-300 ${
        isLight ? "bg-white text-black" : "bg-[#1a1a1a] text-white"
      }`}
    >
      <h2 className="text-lg font-semibold mb-4 text-center">
        Revenue by Location
      </h2>

      {/* Interactive Map */}
      <div className="w-full h-56 md:h-64">
        <ComposableMap
          projectionConfig={{ scale: 160 }}
          style={{ width: "100%", height: "100%" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: Feature[] }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.properties?.NAME || geo.id}
                  geography={geo}
                  fill={isLight ? "#cce5ff" : "#2d2d2d"} 
                  stroke={isLight ? "#60a5fa" : "#404040"} 
                  strokeWidth={0.4}
                />
              ))
            }
          </Geographies>

          {locations.map((loc) => (
            <Marker
              key={loc.name}
              coordinates={loc.coordinates}
              onClick={() =>
                setSelected(selected?.name === loc.name ? null : loc)
              }
            >
              <motion.circle
                r={selected?.name === loc.name ? 6 : 4}
                fill={
                  selected?.name === loc.name
                    ? "#38bdf8"
                    : isLight
                    ? "#2563eb" // ✅ darker blue for light mode markers
                    : "#9ca3af"
                }
                stroke={isLight ? "#000" : "#fff"}
                strokeWidth={0.7}
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.2 }}
              />
              {selected?.name === loc.name && (
                <AnimatePresence>
                  <motion.text
                    x={8}
                    y={4}
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 6 }}
                    exit={{ opacity: 0 }}
                    className={`text-xs ${
                      isLight ? "fill-black" : "fill-white"
                    }`}
                  >
                    {loc.name}: {(loc.revenue / 1000).toFixed(0)}K
                  </motion.text>
                </AnimatePresence>
              )}
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* Revenue Bars */}
      <div className="mt-6 space-y-3">
        {locations.map((loc) => {
          const isActive = selected?.name === loc.name;
          const barWidth = (loc.revenue / maxRevenue) * 100;
          return (
            <div key={loc.name}>
              <div className="flex justify-between text-sm">
                <span
                  className={
                    isActive
                      ? "text-cyan-400 font-semibold"
                      : isLight
                      ? "text-gray-700"
                      : "text-gray-300"
                  }
                >
                  {loc.name}
                </span>
                <span
                  className={
                    isActive
                      ? "text-cyan-400 font-semibold"
                      : isLight
                      ? "text-gray-700"
                      : "text-gray-300"
                  }
                >
                  {(loc.revenue / 1000).toFixed(0)}K
                </span>
              </div>
              <div
                className={`w-full rounded-full h-1.5 mt-1 overflow-hidden ${
                  isLight ? "bg-gray-300" : "bg-gray-700"
                }`}
              >
                <motion.div
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: isActive
                      ? "#38bdf8"
                      : isLight
                      ? "#0ea5e9"
                      : "#0284c7",
                  }}
                  initial={{ scaleY: 0.3, opacity: 0.5 }}
                  animate={{ scaleY: isActive ? 1.5 : 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
