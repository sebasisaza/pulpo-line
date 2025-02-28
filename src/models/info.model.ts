export interface Condition {
  text: string;
  icon: string;
}

export interface Current {
  temp_c: string;
  temp_f: string;
  condition: Condition;
  wind_kph: string;
  humidity: string;
}

export interface Location {
  localtime: string;
  name: string;
}

export interface Info {
  location: Location;
  current: Current;
}
