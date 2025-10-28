import { type FC } from "react"
import WorldMap from "./components/WorldMap/WorldMap";
import CountriesList from "./components/CountriesList/CountriesList";

import './styles/global.scss';

const App: FC = () => {
   return (
      <div className='app-container'>
         <h1>guess country on map</h1>
         <WorldMap />
         <CountriesList />
      </div>
   )
}

export default App;