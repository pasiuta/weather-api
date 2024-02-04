import { Injectable } from '@nestjs/common';
import {WeatherService} from "../../infrastracture/weather.service";
import {IWeatherResponse} from "../types/IWeatherResponse";

@Injectable()
export class StoreWeatherUseCase {
    constructor(private weatherService: WeatherService) {}

    async execute(weatherData: IWeatherResponse): Promise<void> {
        await this.weatherService.saveWeatherData(weatherData);
    }
}
