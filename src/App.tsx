import { useMemo, type FC } from "react"
import WorldMap from "./components/WorldMap/WorldMap";
import { feature } from 'topojson-client';
import worldData from './assets/world-110m.json';

import './styles/global.scss';

const App: FC = () => {
   const countries = useMemo(() => 
      feature(worldData, worldData.objects.countries).features, 
   []);

   return (
      <div className='app-container'>
         <h1>guess country on map</h1>
         <WorldMap countries={countries} />
      </div>
   )
}

export default App;