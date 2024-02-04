import { Injectable } from '@nestjs/common';
import {WeatherService} from "../../infrastracture/weather.service";

@Injectable()
export class GetWeatherUseCase {
    constructor(private weatherService: WeatherService) {}

    async execute(lat: number, lon: number): Promise<any> {
        return await this.weatherService.getWeatherData(lat, lon);
    }
}
