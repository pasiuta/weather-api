import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherController } from './api/weather.controller';
import { FetchWeatherUseCase } from './application/useCases/fetchWeatherUseCase';
import { StoreWeatherUseCase } from './application/useCases/storeWeatherUseCase';
import { GetWeatherUseCase } from './application/useCases/getWeatherUseCase';
import { DatabaseService } from "../../database/database.service";
import { WeatherService } from "./infrastracture/weather.service";

@Module({
    imports: [HttpModule],
    controllers: [WeatherController],
    providers: [
        WeatherService,
        FetchWeatherUseCase,
        StoreWeatherUseCase,
        GetWeatherUseCase,
        DatabaseService,
    ],
})
export class WeatherModule {}
