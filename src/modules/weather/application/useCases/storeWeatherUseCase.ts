import { Injectable } from '@nestjs/common';
import {WeatherService} from "../../infrastracture/weather.service";
import {WeatherDataDto} from "../dto/WeatherDataDto";

@Injectable()
export class StoreWeatherUseCase {
    constructor(private weatherService: WeatherService) {}

    async execute(weatherData: WeatherDataDto): Promise<void> {
        await this.weatherService.saveWeatherData(weatherData);
    }
}
