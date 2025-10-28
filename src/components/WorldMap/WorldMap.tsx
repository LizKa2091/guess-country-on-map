import { useState, type FC } from 'react';
import * as d3 from 'd3-geo';
import type { ICountryItem } from '../../types/countryTypes';
import FormPortal from '../FormPortal/FormPortal';
import { checkCountry } from '../utils/checkCountry';

import styles from './WordMap.module.scss';

interface IWorldMapProps {
   countries: ICountryItem[];
}

const WorldMap: FC<IWorldMapProps> = ({ countries }) => {
   const [hovered, setHovered] = useState<string | null>(null);
   const [isInputting, setIsInputting] = useState<boolean>(false);
   const [inputVal, setInputVal] = useState<string>('');
   const [selectedCountry, setSelectedCountry] = useState<string>('');
   const [isGuessed, setIsGuessed] = useState<boolean | null>(null);

   const projection = d3.geoMercator().scale(100).translate([400, 250]);
   const pathGenerator = d3.geoPath().projection(projection);

   const handleCountryClick = (country: string) => {
      setIsGuessed(null);
      setSelectedCountry(country);
      setIsInputting(true);
   }

   const checkIfGuessed = () => {
      setIsGuessed(checkCountry(selectedCountry, inputVal));
   }

   return (
      <>
         <svg className={styles.svg}>
            {countries.map((data: ICountryItem) => {
               const name = data.properties.name || data.id;
               const isHovered = hovered === name;

               return (
                  <path
                     key={data.id}
                     d={pathGenerator(data)}
                     fill={isHovered ? "#ffcc00" : "#ddd"}
                     stroke='#333'
                     onMouseEnter={() => setHovered(name)}
                     onMouseLeave={() => setHovered(null)}
                     onClick={() => handleCountryClick(data.properties.name || data.id)}
                  />
               )
            })}
         </svg>
         <FormPortal isShowing={isInputting} setIsShowing={setIsInputting}>
            <form onSubmit={(e) => e.preventDefault()} action='' className={styles.form}>
               <label htmlFor='country'>Введите название выбранной страны</label>
               <input  
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder='Название страны на английском' 
                  id='country' 
                  className={styles.formInput} 
               />
               <button type='submit' onClick={checkIfGuessed} className={styles.formButton}>Проверить</button>
               <p className={isGuessed ? styles.success : styles.error}>
                  {typeof isGuessed === 'boolean' && (
                     isGuessed ? 'Вы угадали!' : 'Вы не угадали, попробуйте ещё раз'
                  )}
               </p>
            </form>
         </FormPortal>
      </>
   )
}

export default WorldMap;