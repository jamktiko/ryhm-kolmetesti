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
	time?: string[] | null;
	temperature_2m?: number[] | null;
	relative_humidity_2m?: number[] | null;
	precipitation_probability?: number[] | null;
	precipitation?: number[] | null;
	wind_speed_10m?: number[] | null;
	cloud_cover?: number[] | null;
	wind_direction_10m?: number[] | null;
	uv_index?: number[] | null;
	is_day?: number[] | null;
	sunshine_duration?: number[] | null;
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
	time?: string[] | null;
	temperature_2m_max?: number[] | null;
	temperature_2m_min?: number[] | null;
	wind_speed_10m_max?: number[] | null;
	wind_direction_10m_dominant?: number[] | null;
	uv_index_max?: number[] | null;
	precipitation_probability_max?: number[] | null;
	temperature_2m_mean?: number[] | null;
	cloud_cover_mean?: number[] | null;
}
