export interface Weather {
	Date: Date;
	//Time: string;
	Temperature: number;
	Humidity: number;
	WindDirection: number;
	WindSpeedMS: number;
	TotalCloudCover: number;
	PoP: number;
	ProbabilityThunderstorm: number;
	SmartSymbol: string;
	Precipitation1h: number; //mm
}
