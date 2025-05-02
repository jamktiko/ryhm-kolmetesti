import type { Weather } from '$lib/types/weather';
import type { WeatherEffect } from '$lib/types/weathereffect';
import { weatherEffects, WeatherEffects } from '$lib/weathereffects';

class WeatherGlobal {
	// private _currentWeather: string = $derived(
	// 	this.saatietoTaulukko[this.selectedDay - 1][this.selectedHour - 1].WeatherSymbol3
	// );
	private _weatherDayList: Weather[] = $derived(this.setWeatherDayList()); // Lista missä joka päivän klo 15 säätieto
	private _hakuPaivat: number = $state(7); // Kuinka monen päivän sää haetaan
	private _paivienMaara: number = $state(7);
	private _saatietoTaulukko: Weather[] = $state([]); // Taulukko joka sisältää kaikki säätiedot objekteina
	private _selectedDay: number = $state(0); // Muuttuja joka sisältää valitun päivän päivämäärän
	private _selectedHour: number = $state(0); // Muuttuja joka sisältää valitun säätiedon tunnin
	private _selectedCity: string = $state(''); // Muuttuja joka sitältää valitun kaupungin
	private _selectedWeather: Weather = $derived(this.setSelectedWeather()); // Muuttuja joka sisältää valitun sään
	private _currentWeatherEffect: WeatherEffect = $derived(this.setCurrentWeatherEffect()); // Muuttuja joka pitää sisällään tämän hetkisen sääefektin

	private setCurrentWeatherEffect() {
		switch (this.selectedWeather.WeatherSymbol3) {
			case '0':
			case '1':
				return weatherEffects[WeatherEffects['Clear']];
				break;
			case '2':
				return weatherEffects[WeatherEffects['PartlyCloudy']];
				break;
			case '3':
				return weatherEffects[WeatherEffects['Cloudy']];
				break;
			case '21':
			case '22':
			case '31':
			case '32':
			case '72':
			case '81':
			case '82':
				return weatherEffects[WeatherEffects['Rain']];
				break;
			case '23':
			case '33':
			case '73':
			case '83':
				return weatherEffects[WeatherEffects['StrongRain']];
				break;
			case '41':
			case '42':
			case '51':
			case '52':
				return weatherEffects[WeatherEffects['Snow']];
				break;
			case '43':
			case '53':
				return weatherEffects[WeatherEffects['StrongSnow']];
				break;
			case '61':
			case '63':
				return weatherEffects[WeatherEffects['Thunder']];
				break;
			case '62':
			case '64':
				return weatherEffects[WeatherEffects['StrongThunder']];
				break;
			case '91':
			case '92':
				return weatherEffects[WeatherEffects['Fog']];
				break;
		}
		return weatherEffects[WeatherEffects['Clear']];
	}

	get currentWeatherEffect() {
		return this._currentWeatherEffect;
	}

	private setWeatherDayList() {
		// Laittaa taulukkoon joka päivältä kello 15 sään, paitsi ekaltam jos kello on yli 15. Jos kello on yli 21, se laittaa vasta seuraavan päivän listaan.
		if (this.saatietoTaulukko.length > 0) {
			let loop = false;
			const tietoTaulukko: Weather[] = [];
			for (const tieto of this.saatietoTaulukko) {
				if (new Date().getHours() < 15 || new Date().getHours() >= 21) {
					if (tieto.Date.getHours() === 15) {
						tietoTaulukko.push(tieto);
					}
				} else {
					if (!loop) {
						tietoTaulukko.push(tieto);
					}
					if (tieto.Date.getHours() === 15 && tieto.Date.getDay() !== new Date().getDay()) {
						tietoTaulukko.push(tieto);
					}
				}
				loop = true;
			}
			console.log('PäiväTaulukko:');
			console.log(tietoTaulukko);
			return tietoTaulukko;
		}
		return [];
	}

	get selectedWeather() {
		return this._selectedWeather;
	}
	private setSelectedWeather() {
		// Asettaa valitun säätiedon päivien ja tuntien mukaan
		return (
			this.saatietoTaulukko.find(
				(weather) =>
					weather.Date.getDate() === this.selectedDay &&
					weather.Date.getHours() === this.selectedHour
			) ?? {
				Date: new Date(),
				Temperature: 0,
				Humidity: '0',
				WindDirection: '0',
				WindSpeedMS: '0',
				TotalCloudCover: '0',
				PoP: '0',
				ProbabilityThunderstorm: '0',
				WeatherSymbol3: '0',
				Precipitation1h: '0' //mm
			}
		);
	}

	get weatherDayList() {
		return this._weatherDayList;
	}
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
	get selectedDay() {
		return this._selectedDay;
	}
	set selectedDay(day: number) {
		this._selectedDay = day;
	}
	set saatietoTaulukko(taulukko: Weather[]) {
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

	set selectedHour(number: number) {
		this._selectedHour = number;
	}
	get selectedHour() {
		return this._selectedHour;
	}
}

export const weatherGlobal = new WeatherGlobal();
