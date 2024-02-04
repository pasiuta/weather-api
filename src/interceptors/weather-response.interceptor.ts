import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => ({
                sunrise: data.sunrise,
                sunset: data.sunset,
                temp: data.temp,
                feels_like: data.feels_like,
                pressure: data.pressure,
                humidity: data.humidity,
                uvi: data.uvi,
                wind_speed: data.wind_speed
            }))
        );
    }
}
