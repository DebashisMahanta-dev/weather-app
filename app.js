// Simple app.js using fetch to call WeatherAPI.com
// Expects the API key to be defined at window.WEATHER_API_KEY (see config.example.js)

const API_KEY = window.WEATHER_API_KEY || '';
const BASE = 'https://api.weatherapi.com/v1/current.json';

const els = {
  form: document.getElementById('searchForm'),
  input: document.getElementById('cityInput'),
  status: document.getElementById('status'),
  result: document.getElementById('result'),
  city: document.getElementById('city'),
  desc: document.getElementById('desc'),
  temp: document.getElementById('temp'),
  feels: document.getElementById('feels'),
  humidity: document.getElementById('humidity'),
  icon: document.getElementById('icon')
};

function setStatus(text, isError = false){
  els.status.textContent = text;
  els.status.style.color = isError ? '#ffb4b4' : '';
}

function showResult(){ els.result.classList.remove('hidden'); }
function hideResult(){ els.result.classList.add('hidden'); }

async function fetchWeather(city){
  if(!API_KEY || API_KEY === 'YOUR_API_KEY_HERE'){
    throw new Error('Missing API key. Create config.js from config.example.js and set window.WEATHER_API_KEY.');
  }
  const url = `${BASE}?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;
  const res = await fetch(url);
  if(!res.ok){
    const data = await res.json().catch(()=>({}));
    const msg = data.error && data.error.message || res.statusText || 'Failed to fetch weather';
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

function updateUI(data){
  const location = data.location;
  const current = data.current;
  
  const name = `${location.name}, ${location.country}`;
  els.city.textContent = name;
  els.desc.textContent = current.condition.text || '';
  els.temp.textContent = Math.round(current.temp_c);
  els.feels.textContent = Math.round(current.feelslike_c);
  els.humidity.textContent = current.humidity;

  if(current.condition && current.condition.icon){
    // WeatherAPI returns icons with protocol, so use as-is
    els.icon.src = `https:${current.condition.icon}`;
    els.icon.alt = current.condition.text || 'weather icon';
  } else {
    els.icon.src = '';
    els.icon.alt = '';
  }
  showResult();
}

els.form.addEventListener('submit', async (ev)=>{
  ev.preventDefault();
  const city = els.input.value.trim();
  if(!city) return;
  hideResult();
  setStatus('Loading...');
  try{
    const data = await fetchWeather(city);
    updateUI(data);
    setStatus('');
  }catch(err){
    console.error(err);
    if(err.status === 404){
      setStatus('City not found. Try another name.', true);
    } else {
      setStatus(err.message || 'Error fetching weather', true);
    }
  }
});

// Optional: perform a default search (uncomment to enable)
// els.input.value = 'New York';
// els.form.dispatchEvent(new Event('submit'));
