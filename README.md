# Simple Weather App (Vanilla JS)

A minimal front-end weather app using HTML, CSS and vanilla JavaScript (fetch API) that queries WeatherAPI.com.

Features

- Search by city name
- Displays temperature, feels-like, humidity and weather description
- Uses WeatherAPI.com current weather API
- Designed for easy deployment to GitHub Pages or Netlify

Setup

1. Sign up for a free API key at https://www.weatherapi.com/.
2. In this project folder, copy `config.example.js` -> `config.js` and replace the placeholder with your real API key, e.g.:

   window.WEATHER_API_KEY = 'your_real_key_here';

3. Open `index.html` in a browser (double-click or serve via a static server).

Note on security: this simple front-end app stores the API key client-side. For production, consider proxying requests via a server or using Netlify serverless functions to keep keys secret.

Deployment

- GitHub Pages: push this repo to GitHub and enable Pages from the repository settings (use the main branch root). For a single-page app, index.html at repo root works.
- Netlify: drag-and-drop the built folder or connect the Git repository; add an environment variable (WEATHER_API_KEY) and use a small build step or create a serverless function to inject it. For this simple app, you'd typically commit a `config.js` with the key (not recommended). Instead, prefer Netlify functions to keep keys private.

Quick local test (PowerShell):

# Serve with a tiny local server using Python (if installed)

python -m http.server 8000

# then open http://localhost:8000

Next improvements

- Add 5-day forecast
- Improve error handling and retry/backoff
- Add geolocation support
- Use a small build step and hide keys via serverless functions

License: MIT
