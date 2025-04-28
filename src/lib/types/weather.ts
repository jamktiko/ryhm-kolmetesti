export interface Weather {
	latitude: number;
	longitude: number;
	generationtime_ms: number;
	utc_offset_seconds: number;
	timezone: string;
	timezone_abbreviation: string;
	elevation: number;
	current_units: CurrentUnits;
	current: Current;
	hourly_units: HourlyUnits;
	hourly: Hourly;
	daily_units: DailyUnits;
	daily: Daily;
}
export interface CurrentUnits {
	time: string;
	interval: string;
	temperature_2m: string;
	rain: string;
	precipitation: string;
	showers: string;
	snowfall: string;
	relative_humidity_2m: string;
	apparent_temperature: string;
	is_day: string;
	wind_speed_10m: string;
	wind_direction_10m: string;
	cloud_cover: string;
}
export interface Current {
	time: string;
	interval: number;
	temperature_2m: number;
	rain: number;
	precipitation: number;
	showers: number;
	snowfall: number;
	relative_humidity_2m: number;
	apparent_temperature: number;
	is_day: number;
	wind_speed_10m: number;
	wind_direction_10m: number;
	cloud_cover: number;
}
export interface HourlyUnits {
	time: string;
	temperature_2m: string;
	relative_humidity_2m: string;
	precipitation_probability: string;
	precipitation: string;
	wind_speed_10m: string;
	cloud_cover: string;
	wind_direction_10m: string;
	uv_index: string;
	is_day: string;
	sunshine_duration: string;
}
export interface Hourly {
	time: string[];
	temperature_2m: number[];
	relative_humidity_2m: number[];
	precipitation_probability: number[];
	precipitation: number[];
	wind_speed_10m: number[];
	cloud_cover: number[];
	wind_direction_10m: number[];
	uv_index: number[];
	is_day: number[];
	sunshine_duration: number[];
}
export interface Hour {
	time: string;
	temperature_2m: number;
	relative_humidity_2m: number;
	precipitation_probability: number;
	precipitation: number;
	wind_speed_10m: number;
	cloud_cover: number;
	wind_direction_10m: number;
	uv_index: number;
	is_day: number;
	sunshine_duration: number;
}
export interface DailyUnits {
	time: string;
	temperature_2m_max: string;
	temperature_2m_min: string;
	wind_speed_10m_max: string;
	wind_direction_10m_dominant: string;
	uv_index_max: string;
	precipitation_probability_max: string;
	temperature_2m_mean: string;
	cloud_cover_mean: string;
}
export interface Daily {
	time: string[];
	temperature_2m_max: number[];
	temperature_2m_min: number[];
	wind_speed_10m_max: number[];
	wind_direction_10m_dominant: number[];
	uv_index_max: number[];
	precipitation_probability_max: number[];
	temperature_2m_mean: number[];
	cloud_cover_mean: number[];
}
