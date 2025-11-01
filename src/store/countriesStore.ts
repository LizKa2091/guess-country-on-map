import { create } from "zustand";
import { persist } from "zustand/middleware";
import worldData from './../assets/world-110m.json';
import { feature } from 'topojson-client';
import type { IStatusedCountryItem } from "../types/countryTypes";

interface ICountriesState {
   countries: IStatusedCountryItem[],
   tippedCountryId: string | null;
   setFoundCountry: (countryId: string) => void;
   resetCountries: () => void;
   tipCountry: (countryId: string | null) => void;
}

const initialCountries: IStatusedCountryItem[] = feature(worldData, worldData.objects.countries).features;
const statusedCountries: IStatusedCountryItem[] = initialCountries.map(item => ({
   ...item,
   status: 'not found'
}));

export const useCountries = create<ICountriesState>()(persist((set) => ({
   countries: statusedCountries,
   tippedCountryId: null,
   setFoundCountry: (countryId) => set((state) => ({
      countries: state.countries.map((country) => country.id === countryId ? { ...country, status: 'found' } : country)
   })),
   resetCountries: () => set({ countries: statusedCountries, tippedCountryId: null }),
   tipCountry: (countryId) => set({ tippedCountryId: countryId })
}), 
   { name: 'countries' } 
))