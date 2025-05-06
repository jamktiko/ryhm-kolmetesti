import type { WeatherEffect } from '$lib/types/weathereffect';
export enum WeatherEffects {
	Clear,
	PartlyCloudy,
	Cloudy,
	Rain,
	StrongRain,
	Snow,
	StrongSnow,
	Thunder,
	StrongThunder,
	Fog
}
export const weatherEffects: WeatherEffect[] = [
	{
		SkyColor: 0x9dc5f2,
		CloudColor: 0xe6e3e6,
		ShadowColor: 0xd1d1d1,
		SunColor: 0xb3ab9f,
		GlareColor: 0xb3ab9f,
		LightColor: 0xb3ab9f
	},
	{
		SkyColor: 0xc2d8f2,
		CloudColor: 0xd4d1d4,
		ShadowColor: 0xd1d1d1,
		SunColor: 0xb3ab9f,
		GlareColor: 0xb3ab9f,
		LightColor: 0xb3ab9f
	},
	{
		SkyColor: 0xd9d9d9,
		CloudColor: 0xd4d1d4,
		ShadowColor: 0x9e9d9e,
		SunColor: 0xb3ab9f,
		GlareColor: 0xb3ab9f,
		LightColor: 0xb3ab9f
	},
	{
		SkyColor: 0xcbcfd2,
		CloudColor: 0xb9b8b7,
		ShadowColor: 0x819d9e,
		SunColor: 0xa2a4a5,
		GlareColor: 0xa2a4a5,
		LightColor: 0xa2a4a5
	},
	{
		SkyColor: 0xacaaac,
		CloudColor: 0xb9b8b7,
		ShadowColor: 0x3f3c3b,
		SunColor: 0x3f3c3b,
		GlareColor: 0x3f3c3b,
		LightColor: 0x3f3c3b
	},
	{
		SkyColor: 0xcdccd0,
		CloudColor: 0xe2dee2,
		ShadowColor: 0xa9adb7,
		SunColor: 0x939893,
		GlareColor: 0x939893,
		LightColor: 0x939893
	},
	{
		SkyColor: 0xcdccd0,
		CloudColor: 0xe2dee2,
		ShadowColor: 0xa9adb7,
		SunColor: 0x939893,
		GlareColor: 0x939893,
		LightColor: 0x939893
	},
	{
		SkyColor: 0xa09fa9,
		CloudColor: 0x837293,
		ShadowColor: 0x41003d,
		SunColor: 0xbbb4d2,
		GlareColor: 0xbbb4d2,
		LightColor: 0xbbb4d2
	},
	{
		SkyColor: 0x786983,
		CloudColor: 0x785e7f,
		ShadowColor: 0x260039,
		SunColor: 0xa78bb0,
		GlareColor: 0xa78bb0,
		LightColor: 0xa78bb0
	},
	{
		SkyColor: 0xeff0ef,
		CloudColor: 0xd4d1d4,
		ShadowColor: 0x9e9d9e,
		SunColor: 0x9e9d9e,
		GlareColor: 0x9e9d9e,
		LightColor: 0x9e9d9e
	}
];
