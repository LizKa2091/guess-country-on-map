import { useMemo, type FC } from "react"
import { feature } from 'topojson-client';
import worldData from './assets/world-110m.json';
import WorldMap from "./components/WorldMap/WorldMap";
import CountriesList from "./components/CountriesList/CountriesList";
import type { ICountryItem } from "./types/countryTypes";

import './styles/global.scss';

const App: FC = () => {
   const countries: ICountryItem[] = useMemo(() => 
      feature(worldData, worldData.objects.countries).features, 
   []);

   return (
      <div className='app-container'>
         <h1>guess country on map</h1>
         <WorldMap countries={countries} />
         <CountriesList countries={countries} />
      </div>
   )
}

export default App;