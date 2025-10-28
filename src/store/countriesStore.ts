import { create } from "zustand";
import worldData from './../assets/world-110m.json';
import { feature } from 'topojson-client';
import type { IStatusedCountryItem } from "../types/countryTypes";

interface ICountriesState {
   countries: IStatusedCountryItem[],
   setFoundCountry: (countryId: string) => void;
   resetCountries: () => void;
}

const initialCountries: IStatusedCountryItem[] = feature(worldData, worldData.objects.countries).features;
const statusedCountries: IStatusedCountryItem[] = initialCountries.map(item => ({
   ...item,
   status: 'not found'
}));

export const useCountries = create<ICountriesState>((set) => ({
   countries: statusedCountries,
   setFoundCountry: (countryId) => set((state) => ({
      countries: state.countries.map(country => country.id === countryId ? { ...country, status: 'found' } : country)
   })),
   resetCountries: () => set({ countries: statusedCountries })
}))