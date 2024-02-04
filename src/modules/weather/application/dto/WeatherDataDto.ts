import { IsNumber, IsOptional } from 'class-validator';

export class WeatherDataDto {
    @IsNumber()
    lat: number;

    @IsNumber()
    lon: number;

    @IsNumber()
    @IsOptional()
    temp?: number;

    @IsNumber()
    @IsOptional()
    feels_like?: number;

    @IsNumber()
    @IsOptional()
    pressure?: number;

    @IsNumber()
    @IsOptional()
    humidity?: number;

    @IsNumber()
    @IsOptional()
    uvi?: number;

    @IsNumber()
    @IsOptional()
    wind_speed?: number;

    @IsNumber()
    @IsOptional()
    sunrise?: number;

    @IsNumber()
    @IsOptional()
    sunset?: number;
}
