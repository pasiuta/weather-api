import {Body, Controller, Get, Post} from '@nestjs/common';
import {FetchWeatherUseCase} from "../application/useCases/fetchWeatherUseCase";
import {StoreWeatherUseCase} from "../application/useCases/storeWeatherUseCase";
import {GetWeatherUseCase} from "../application/useCases/getWeatherUseCase";

@Controller('weather')
export class WeatherController {
    constructor(
        private readonly fetchWeatherUseCase: FetchWeatherUseCase,
        private readonly storeWeatherUseCase: StoreWeatherUseCase,
        private readonly getWeatherUseCase: GetWeatherUseCase,
    ) {}

    @Post('/fetch')
    async fetchAndStoreWeather(@Body() body: { lat: number; lon: number; part?: string }) {
        const weatherData = await this.fetchWeatherUseCase.execute(body.lat, body.lon, body.part);

        await this.storeWeatherUseCase.execute(weatherData);

        return { message: 'Weather data fetched from API and stored successfully.' };
    }

    @Get()
    async getWeather(@Body() body: { lat: number; lon: number }) {
        return await this.getWeatherUseCase.execute(body.lat, body.lon);
    }
}
