export interface Country {
    iso2: string;
    iso3: string;
    country: string;
    cities: string[];
}

export interface CitiesData {
    id: string;
    cities: string[];
}
