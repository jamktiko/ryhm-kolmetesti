# CloudCast -Weather App

A weather app that show forecast information about cities in Finland.

## Description

The app fetches weather forecast data for the next 7 days for the selected city and saves the selected city in local storage. It uses a timestep of 180 minutes to get weather data every 3 hours. Forecast data inculudes: temperature, humidity, wind direction and speed, total cloud cover, propability and amount of precipitation.

## Getting Started

### Dependencies

devDependencies

- Svelte
- Eslint
- Prettier
- Vite

Dependencies

- Three
- Vanta

Weather forecast data is from [FMI Open Data](https://en.ilmatieteenlaitos.fi/open-data)

Ip API for fecthing city is [Ipapi-co](https://github.com/ipapi-co/)

### Installing

- Clone this repository to any directory and go to the cloned directory

```
git clone https://github.com/jamktiko/ryhma-kolme

cd ryhma-kolme/
```

- Then run npm install to install dependencies

```
npm install
```

- Lastly run npm run dev to build it and host locally

```
npm run dev
```

### Executing program

- To build and host locally, use npm run dev in the directory

```
npm run dev
```

## Authors

- Sade Haarala
- Konsta Poikolainen
- Jarkko Remes
- Matias Vairama

## Version History

- 1.0
  - Initial Release

## License

This project is licensed under the CC BY-SA 4.0 License - see the LICENSE.md file for details

[![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png
