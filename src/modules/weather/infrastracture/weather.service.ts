import { Injectable } from '@nestjs/common';
import {WeatherDataDto} from "../application/dto/WeatherDataDto";
import {DatabaseService} from "../../../database/database.service";
import {IWeatherResponse} from "../application/types/IWeatherResponse";

@Injectable()
export class WeatherService {
    constructor(private databaseService: DatabaseService) {}

    async saveWeatherData(weatherData: WeatherDataDto): Promise<void> {
        const query = `
            INSERT INTO weather_data(
                lat, lon, temp, feels_like, pressure, humidity, uvi, wind_speed, sunrise, sunset
            ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `;
        const values = [
            weatherData.lat,
            weatherData.lon,
            weatherData.temp,
            weatherData.feels_like,
            weatherData.pressure,
            weatherData.humidity,
            weatherData.uvi,
            weatherData.wind_speed,
            weatherData.sunrise,
            weatherData.sunset
        ];

        await this.databaseService.pool.query(query, values);
    }

    async getWeatherData(lat: number, lon: number):Promise<IWeatherResponse> {
        const query = `
      SELECT * FROM weather_data
      WHERE lat = $1 AND lon = $2
      ORDER BY recorded_at DESC LIMIT 1
    `;
        const values = [lat, lon];
        const result = await this.databaseService.pool.query(query, values);
        return result.rows[0];
    }
}
