import type { Weather } from '$lib/types/weather';
class WeatherGlobal {
	private _weather: Weather | null = $state(null);
	get weather() {
		return this._weather;
	}
	set weather(weather: Weather | null) {
		this._weather = weather;
	}
}

export const weatherGlobal = new WeatherGlobal();
