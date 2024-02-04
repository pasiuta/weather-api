import {Body, Controller, Get, Post, UseInterceptors} from '@nestjs/common';
import {FetchWeatherUseCase} from "../application/useCases/fetchWeatherUseCase";
import {StoreWeatherUseCase} from "../application/useCases/storeWeatherUseCase";
import {GetWeatherUseCase} from "../application/useCases/getWeatherUseCase";
import {WeatherResponseInterceptor} from "../../../interceptors/weather-response.interceptor";

@Controller('weather')
export class WeatherController {
    constructor(
        private readonly fetchWeatherUseCase: FetchWeatherUseCase,
        private readonly storeWeatherUseCase: StoreWeatherUseCase,
        private readonly getWeatherUseCase: GetWeatherUseCase,
    ) {}

    @Post('/fetch')
    async fetchWeather(@Body() body: { lat: number; lon: number; part?: string }):Promise<void> {
        const weatherData = await this.fetchWeatherUseCase.execute(body.lat, body.lon, body.part);

        await this.storeWeatherUseCase.execute(weatherData);

    }

    @UseInterceptors(WeatherResponseInterceptor)
    @Get()
    async getWeather(@Body() body: { lat: number; lon: number }) {
        return await this.getWeatherUseCase.execute(body.lat, body.lon);
    }
}
