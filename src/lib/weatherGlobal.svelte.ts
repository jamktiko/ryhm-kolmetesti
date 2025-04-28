import type { Weather, Hour } from '$lib/types/weather';

class WeatherGlobal {
	private _selectedDay: number = 1;
	private _weather: Weather | null = $state(null);
	get weather() {
		return this._weather;
	}
	set weather(weather: Weather | null) {
		this._weather = weather;
	}
	get selectedDay() {
		return this._selectedDay;
	}
	set selectedDay(day: number) {
		this._selectedDay = day;
	}
	// Palauttaa taulukon yhden päivän 3 tunnin välein olevista säätiedoista
	weatherHours(day: number) {
		const skip = (day - 1) * 8; // Joka päivältä on 8 säätietoa
		const weathers: Hour[] = [];
		if (this._weather) {
			for (let i = 0; i < 8; i++) {
				weathers.push({
					time: this._weather.hourly.time[i + skip],
					temperature_2m: this._weather.hourly.temperature_2m[i + skip],
					relative_humidity_2m: this._weather.hourly.relative_humidity_2m[i + skip],
					precipitation_probability: this._weather.hourly.precipitation_probability[i + skip],
					precipitation: this._weather.hourly.precipitation[i + skip],
					wind_speed_10m: this._weather.hourly.wind_speed_10m[i + skip],
					cloud_cover: this._weather.hourly.cloud_cover[i + skip],
					wind_direction_10m: this._weather.hourly.wind_direction_10m[i + skip],
					uv_index: this._weather.hourly.uv_index[i + skip],
					is_day: this._weather.hourly.is_day[i + skip],
					sunshine_duration: this._weather.hourly.sunshine_duration[i + skip]
				});
			}
		}
		return weathers;
	}
}

export const weatherGlobal = new WeatherGlobal();
