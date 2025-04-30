import type { Weather } from '$lib/types/weather';

class WeatherGlobal {
	private _currentWeather: string = $derived(
		this.saatietoTaulukko[this.selectedDay - 1][this.selectedHour - 1].WeatherSymbol3
	);
	private _hakuPaivat: number = $state(7);
	private _paivienMaara: number = $state(7);
	private _saatietoTaulukko: Weather[][] = $state([]);
	private _selectedDay: number = $state(1);
	private _weather: Weather | null = $state(null);
	private _tietojaPaivassa: number = $state(8);
	private _selectedHour: number = $state(1);
	private _selectedCity: string = $state('');

	get selectedCity() {
		return this._selectedCity;
	}
	set selectedCity(city: string) {
		this._selectedCity = city;
	}
	get hakuPaivat() {
		return this._hakuPaivat;
	}
	set hakuPaivat(number: number) {
		this._hakuPaivat = number;
	}
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
	set saatietoTaulukko(taulukko: Weather[][]) {
		this._saatietoTaulukko = taulukko;
	}
	get saatietoTaulukko() {
		return this._saatietoTaulukko;
	}
	set paivienMaara(number: number) {
		this._paivienMaara = number;
	}
	get paivienMaara() {
		return this._paivienMaara;
	}
	set tietojaPaivassa(number: number) {
		this._tietojaPaivassa = number;
	}
	get tietojaPaivassa() {
		return this._tietojaPaivassa;
	}
	set selectedHour(number: number) {
		this._selectedHour = number;
	}
	get selectedHour() {
		return this._selectedHour;
	}
}

export const weatherGlobal = new WeatherGlobal();
