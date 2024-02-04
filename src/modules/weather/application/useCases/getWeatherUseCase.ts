import { Injectable } from '@nestjs/common';
import {WeatherService} from "../../infrastracture/weather.service";
import {IWeatherResponse} from "../types/IWeatherResponse";

@Injectable()
export class GetWeatherUseCase {
    constructor(private weatherService: WeatherService) {}

    async execute(lat: number, lon: number): Promise<IWeatherResponse> {
        return await this.weatherService.getWeatherData(lat, lon);
    }
}
