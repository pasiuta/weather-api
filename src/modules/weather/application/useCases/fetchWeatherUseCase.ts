import {Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {IWeatherResponse} from "../types/IWeatherResponse";

@Injectable()
export class FetchWeatherUseCase {
    constructor(private httpService: HttpService) {}

    async execute(lat: number, lon: number, part?: string): Promise<IWeatherResponse> {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}`;
        const response = await this.httpService.get(url).toPromise();
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
