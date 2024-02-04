CREATE TABLE IF NOT EXISTS weather_data (
    id SERIAL PRIMARY KEY,
    lat NUMERIC(10, 8) NOT NULL,
    lon NUMERIC(11, 8) NOT NULL,
    temp NUMERIC,
    feels_like NUMERIC,
    pressure INT,
    humidity INT,
    uvi NUMERIC,
    wind_speed NUMERIC,
    sunrise BIGINT,
    sunset BIGINT,
    recorded_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'utc')
);
