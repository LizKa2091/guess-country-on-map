import { type FC } from "react"
import WorldMap from "./components/WorldMap";
import './styles/global.scss';

const App: FC = () => {

   return (
      <>
         <h1>guess country on map</h1>
         <WorldMap />
      </>
   )
}

export default App;