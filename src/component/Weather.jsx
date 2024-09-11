import { useEffect, useState } from "react";
import Search from "./search";

function Weather() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    async function fetchWeatherData(city) {
        try {
            setLoading(true);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=15cc61fd454dc82cb21572281f7c1f5a&units=metric`);
            const data = await response.json();
            if (data) {
                setWeatherData(data);
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    function handleSearch() {
        fetchWeatherData(search);
    }

    useEffect(() => {
        fetchWeatherData("Delhi");
    }, []);

    function getCurrentData() {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }

    return (
        <>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            {loading ? (
                <div className="loading">Loading...</div>
            ) : weatherData ? (
                <div className="weather-container">
                    <div className="weather-header">
                        <h2 className="city-name">
                            {weatherData.name}, <span>{weatherData.sys.country}</span>
                        </h2>
                        <span className="city-date">{getCurrentData()}</span>
                    </div>
                    <div className="weather-details">
                        <div className="city-temp">
                            <p>{Math.round(weatherData.main.temp)}°C</p>
                        </div>
                        <p className="weather-description">
                            {weatherData.weather[0]?.description}
                        </p>
                        <div className="weather-info">
                            <div className="info-item">
                                <p className="info-value">{Math.round(weatherData.main.feels_like)}°C</p>
                                <p className="info-label">Feels Like</p>
                            </div>
                            <div className="info-item">
                                <p className="info-value">{weatherData.main.humidity}%</p>
                                <p className="info-label">Humidity</p>
                            </div>
                            <div className="info-item">
                                <p className="info-value">{Math.round(weatherData.main.pressure)} hPa</p>
                                <p className="info-label">Pressure</p>
                            </div>
                            <div className="info-item">
                                <p className="info-value">{Math.round(weatherData.wind.speed)} m/s</p>
                                <p className="info-label">Wind Speed</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="no-data">No weather data available</p>
            )}
        </>
    );
}

export default Weather;
