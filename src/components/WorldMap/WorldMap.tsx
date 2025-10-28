import { useState, type FC } from 'react';
import * as d3 from 'd3-geo';
import FormPortal from '../FormPortal/FormPortal';
import { checkCountry } from '../utils/checkCountry';
import { useCountries } from '../../store/countriesStore';
import type { IStatusedCountryItem } from '../../types/countryTypes';

import styles from './WordMap.module.scss';

const WorldMap: FC = () => {
   const [hovered, setHovered] = useState<string | null>(null);
   const [isInputting, setIsInputting] = useState<boolean>(false);
   const [inputVal, setInputVal] = useState<string>('');
   const [selectedCountry, setSelectedCountry] = useState<string>('');
   const [selectedCountryId, setSelectedCountryId] = useState<string>('');
   const [isGuessed, setIsGuessed] = useState<boolean | null>(null);

   const { countries, setFoundCountry } = useCountries();

   const projection = d3.geoMercator().scale(100).translate([400, 250]);
   const pathGenerator = d3.geoPath().projection(projection);

   const handleCountryClick = (country: string, id: string) => {
      setIsGuessed(null);
      setSelectedCountry(country);
      setSelectedCountryId(id);
      setIsInputting(true);
   }

   const checkIfGuessed = () => {
      const guessStatus = checkCountry(selectedCountry, inputVal);
      
      if (guessStatus) {
         setFoundCountry(selectedCountryId);
      }

      setIsGuessed(guessStatus);
   }

   return (
      <>
         <svg className={styles.svg}>
            {countries.map((data: IStatusedCountryItem) => {
               const name = data.properties.name || data.id;
               const isHovered = hovered === name;
               const isSelected = selectedCountryId === data.id;

               return (
                  <path
                     key={data.id}
                     d={pathGenerator(data)}
                     fill={isHovered || isSelected ? "#ffcc00" :  data.status === 'found' ? '#00ff59ff' : '#ddd'}
                     stroke='#333'
                     onMouseEnter={() => setHovered(name)}
                     onMouseLeave={() => setHovered(null)}
                     onClick={() => handleCountryClick(data.properties.name || data.id, data.id)}
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