import { Body, Controller, Get, HttpException, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { FetchWeatherUseCase } from "../application/useCases/fetchWeatherUseCase";
import { StoreWeatherUseCase } from "../application/useCases/storeWeatherUseCase";
import { GetWeatherUseCase } from "../application/useCases/getWeatherUseCase";
import { WeatherResponseInterceptor } from "../../../interceptors/weather-response.interceptor";
import { WeatherRequestDto } from "../application/dto/WeatherRequestDto";
import { IWeatherResponse } from "../application/types/IWeatherResponse";

@Controller('weather')
export class WeatherController {
    constructor(
        private readonly fetchWeatherUseCase: FetchWeatherUseCase,
        private readonly storeWeatherUseCase: StoreWeatherUseCase,
        private readonly getWeatherUseCase: GetWeatherUseCase,
    ) {}

    @Post('/fetch')
    async fetchWeather( @Body() weatherRequestDto: WeatherRequestDto ): Promise<void> {
        try {
            const weatherData = await this.fetchWeatherUseCase.execute(weatherRequestDto);
            await this.storeWeatherUseCase.execute(weatherData);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
            } else {
                throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    }

    @UseInterceptors( WeatherResponseInterceptor )
    @Get()
    async getWeather( @Body() weatherRequestDto: WeatherRequestDto ):Promise<IWeatherResponse> {
        return this.getWeatherUseCase.execute(weatherRequestDto.lat, weatherRequestDto.lon);
    }
}
