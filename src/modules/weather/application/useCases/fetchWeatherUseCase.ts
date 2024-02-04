import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IWeatherResponse } from "../types/IWeatherResponse";
import { WeatherRequestDto } from "../dto/WeatherRequestDto";
import { lastValueFrom } from "rxjs";

@Injectable()
export class FetchWeatherUseCase {
    constructor( private httpService: HttpService ) {}

    async execute( weatherRequestDto: WeatherRequestDto ): Promise<IWeatherResponse> {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const { lat, lon, part } = weatherRequestDto;
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}`;
        const response = await lastValueFrom(this.httpService.get(url));
        const data = response.data;

        return {
            lat: data.lat,
            lon: data.lon,
            temp: data.current.temp,
            feels_like: data.current.feels_like,
            pressure: data.current.pressure,
            humidity: data.current.humidity,
            uvi: data.current.uvi,
            wind_speed: data.current.wind_speed,
            sunrise: data.current.sunrise,
            sunset: data.current.sunset,
        };
    }
}
