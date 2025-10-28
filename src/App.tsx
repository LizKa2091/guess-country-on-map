import { type FC } from "react"
import WorldMap from "./components/WorldMap/WorldMap";

import './styles/global.scss';

const App: FC = () => {

   return (
      <div className='app-container'>
         <h1>guess country on map</h1>
         <WorldMap />
      </div>
   )
}

export default App;