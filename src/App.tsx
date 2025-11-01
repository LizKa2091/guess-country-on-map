import { type FC } from "react"
import WorldMap from "./components/WorldMap/WorldMap";
import CountriesList from "./components/CountriesList/CountriesList";

import './styles/global.scss';

const App: FC = () => {
   return (
      <div className='app-container'>
         <WorldMap />
         <CountriesList />
      </div>
   )
}

export default App;