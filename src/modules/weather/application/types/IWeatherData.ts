export interface IWeatherData {
    lat: number;
    lon: number;
    temp?: number;
    feels_like?: number;
    pressure?: number;
    humidity?: number;
    uvi?: number;
    wind_speed?: number;
    sunrise?: number;
    sunset?: number;
}
