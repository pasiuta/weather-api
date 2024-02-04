import { IsNumber, IsOptional, IsString } from 'class-validator';

export class WeatherRequestDto {
    @IsNumber()
    lat: number;

    @IsNumber()
    lon: number;

    @IsString()
    @IsOptional()
    part?: string;
}
