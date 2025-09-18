// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import { handleDemo } from "./routes/demo";

// export function createServer() {
//   const app = express();

//   // Middleware
//   app.use(cors());
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));

//   // Example API routes
//   app.get("/api/ping", (_req, res) => {
//     const ping = process.env.PING_MESSAGE ?? "ping";
//     res.json({ message: ping });
//   });

//   app.get("/api/demo", handleDemo);

//   return app;
// }

import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";
import { handleDemo } from "./routes/demo";
import { handleLogin } from "./routes/auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  
  // Authentication routes
  app.post("/api/login", handleLogin);

  // 🌦️ New Weather API route
  app.get("/api/weather", async (req, res) => {
    try {
      const { lat, lon } = req.query;

      if (!lat || !lon) {
        return res.status(400).json({ error: "lat and lon are required" });
      }

      const apiKey = process.env.OPENWEATHER_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "Missing OPENWEATHER_API_KEY" });
      }

      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            lat,
            lon,
            appid: apiKey,
            units: "metric",
          },
        }
      );

      res.json({
        temperature: response.data.main.temp,
        feels_like: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        wind_speed: response.data.wind.speed,
        description: response.data.weather[0].description,
        raw: response.data, // optional: send entire response
      });
    } catch (error: any) {
      console.error("Weather API error:", error.message);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  return app;
}
