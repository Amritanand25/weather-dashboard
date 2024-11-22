import { openDB, IDBPDatabase } from "idb";
import { CitiesData } from "../types/city";

const DB_NAME = "CityDatabase";
const STORE_NAME = "Cities";

let db: IDBPDatabase | null = null;

// Initialize IndexedDB
const initializeDB = async (): Promise<IDBPDatabase> => {
    if (!db) {
        db = await openDB(DB_NAME, 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: "id" });
                }
            },
        });
    }
    return db;
};

// Save cities to IndexedDB
const saveCitiesToDB = async (cities: string[]): Promise<void> => {
    const db = await initializeDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    await store.put({ id: "cities", cities });
    await tx.done;
};

// Get cities from IndexedDB
const getCitiesFromDB = async (): Promise<string[] | null> => {
    const db = await initializeDB();
    const store = db.transaction(STORE_NAME).objectStore(STORE_NAME);
    const data: CitiesData | undefined = await store.get("cities");
    return data?.cities || null;
};

const fetchCitiesFromAPI = async (): Promise<string[]> => {
    try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries");
        const data = await response.json();
        if (!data || data.error) throw new Error("Error fetching data from API");

        return data.data.reduce((cityList: string[], country: { cities: string[] }) => {
            return cityList.concat(country.cities);
        }, []);
    } catch (error) {
        console.error("Failed to fetch cities from API:", error);
        return [];
    }
};

// Get list of cities
export const getCityList = async (): Promise<string[]> => {
    let cities = await getCitiesFromDB();
    if (!cities) {
        cities = await fetchCitiesFromAPI();
        if (cities.length > 0) {
            await saveCitiesToDB(cities);
        }
    }
    return cities;
};

// Search cities by name
export const searchCity = async (query: string): Promise<string[]> => {
    const cities = await getCityList();
    const lowerCaseQuery = query.toLowerCase();
    return cities.filter((city) =>
        city.toLowerCase().startsWith(lowerCaseQuery)
    );
};
