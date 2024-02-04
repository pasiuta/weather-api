# Weather API

## What is it?
-----------
This API allows you to fetch weather data for a specific latitude and longitude, store it in the database, and retrieve it. You can also store and retrieve weather data manually.

## Prerequisites
-------------
1. Install npm with command: `npm install -g npm`
2. Navigate to this project locally and run: `npm install`
3. Install Node.js: [https://nodejs.org/uk/download/](https://nodejs.org/uk/download/)
4. Install Docker for container management: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
5. Install Postman for testing your requests: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
5. Generate api key here : [https://home.openweathermap.org/api_keys)
6. Pass this already generated api key in .env file to OPENWEATHERMAP_API_KEY variable
## How to use it?
-------------
### 1 Section: Work with Docker:
-----------------------------

1) To start the application and database containers, write the following command in the terminal:

```docker-compose up --build```

This command will start the PostgreSQL database container and the application container as defined in the `docker-compose.yml`.

2) The database will be initialized with the required `weather_data` table automatically.

### 2 Section: Work with app:
------------------------

1) Navigate to Postman.

2) For fetching weather data and storing it in the database, create a POST request to this URL: `http://localhost:3000/weather/fetch` with JSON body like:
```json
{
  "lat": "43.44",
  "lon": "-14.04",
  "part": "minutely,hourly"
}
```

To retrieve weather data from the database, create a GET request to this URL: `http://localhost:3000/weather` with the same JSON body format as above.

For directly checking the database, you can connect to the PostgreSQL container using:

```docker exec -it postgres-db psql -U postgres -d weather_db```

Then, you can execute SQL commands, for example, to see all entries in weather_data:

```SELECT * FROM weather_data;```

## Handling Errors
-----------------

### 400 Bad Request
- This error occurs if the request to the API is not correctly formed or missing required parameters. For instance, if the latitude or longitude values are out of valid range or missing in the request to fetch weather data, the API will respond with a 400 status code.
- Example: If you send a request with an invalid `lat` or `lon` value, you will receive a response:
  ```json
  {
    "statusCode": 400,
    "message": "Bad Request"
  }

### 404 Not Found
This error is returned when a requested resource is not found. For the Weather API, this could occur if you try to retrieve weather data for a set of coordinates that do not exist in the database.

Example: If you make a GET request to retrieve weather data for a specific latitude and longitude that hasn't been fetched and stored in the database, the response will be:
```json
{
"statusCode": 404,
"message": "Weather data not found for the provided location"
}

