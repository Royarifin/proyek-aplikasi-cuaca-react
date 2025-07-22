
import React, { useState } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
    const apiKey = ""; // <-- PENTING: Ganti dengan API key Anda
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const [city, setCity] = useState(""); // State untuk menyimpan input pengguna
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false); // State untuk status loading
    const [error, setError] = useState(null); // State untuk pesan error

    const search = async () => {
        if (city === "") {
            return;
        }
        setLoading(true);
        setError(null);
        setWeatherData(null);

        try {
            const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
            if (!response.ok) {
                throw new Error("Kota tidak ditemukan.");
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <div className="search">
                <input 
                    type="text" 
                    placeholder="Masukkan nama kota..." 
                    spellCheck="false"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyUp={(e) => { if (e.key === "Enter") search(); }}
                />
                <button onClick={search}>Cari</button>
            </div>
            
            {/* Tampilkan pesan loading, error, atau hasil cuaca */}
            {loading && <p className="loading-message">Memuat...</p>}
            {error && <p className="error-message">{error}</p>}
            {weatherData && (
                <div className="weather">
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} className="weather-icon" alt="Ikon Cuaca" />
                    <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>
                    <h2 className="city">{weatherData.name}</h2>
                    <div className="details">
                        <div className="col">
                            <p className="humidity">{weatherData.main.humidity}%</p>
                            <p>Kelembapan</p>
                        </div>
                        <div className="col">
                            <p className="wind">{weatherData.wind.speed} km/h</p>
                            <p>Kecepatan Angin</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;