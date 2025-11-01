import { useState, useEffect, type FC, useCallback, useRef } from 'react';
import * as d3 from 'd3-geo';
import { checkCountry } from '../utils/checkCountry';
import { useCountries } from '../../store/countriesStore';
import FormPortal from '../FormPortal/FormPortal';
import type { IStatusedCountryItem } from '../../types/countryTypes';

import styles from './WordMap.module.scss';

const WorldMap: FC = () => {
   const [hovered, setHovered] = useState<string | null>(null);
   const [isInputting, setIsInputting] = useState<boolean>(false);
   const [inputVal, setInputVal] = useState<string>('');
   const [selectedCountry, setSelectedCountry] = useState<string>('');
   const [selectedCountryId, setSelectedCountryId] = useState<string>('');
   const [isGuessed, setIsGuessed] = useState<boolean | null>(null);

   const [transform, setTransform] = useState({
      scale: 1,
      translateX: 0,
      translateY: 0,
   });

   const { countries, setFoundCountry, tippedCountryId, tipCountry } = useCountries();

   const projection = d3.geoMercator().scale(100).translate([400, 250]); 
   const pathGenerator = d3.geoPath().projection(projection);

   const isResettingRef = useRef(false);

   const zoomToCountry = useCallback((countryFeature: d3.GeoPermissibleObjects) => {
      const [[x0, y0], [x1, y1]] = pathGenerator.bounds(countryFeature);

      const dx = x1 - x0;
      const dy = y1 - y0;
      const x = (x0 + x1) / 2;
      const y = (y0 + y1) / 2;

      const scale = Math.min(4, 0.9 / Math.max(dx / 800, dy / 500));
      const translateX = 400 - scale * x;
      const translateY = 250 - scale * y;

      setTransform({ scale, translateX, translateY });
   }, [pathGenerator]);

   const resetZoom = useCallback(() => {
      isResettingRef.current = true;

      tipCountry(null);
      setSelectedCountry('');
      setSelectedCountryId('');
      setIsGuessed(null);

      setTransform({ scale: 1, translateX: 0, translateY: 0 });

      setTimeout(() => {
         isResettingRef.current = false;
      }, 100);
   }, [tipCountry]);

   const handleCountryClick = (country: string, id: string, feature: d3.GeoPermissibleObjects) => {
      setIsGuessed(null);
      setSelectedCountry(country);
      setSelectedCountryId(id);
      setIsInputting(true);
      zoomToCountry(feature);
   }

   const checkIfGuessed = () => {
      const guessStatus = checkCountry(selectedCountry, inputVal);
      
      if (guessStatus) {
         setFoundCountry(selectedCountryId);
      }

      setIsGuessed(guessStatus);
   }

   useEffect(() => {
      if (!tippedCountryId || isResettingRef.current) return;

      const countryFeature = countries.find(c => c.id === tippedCountryId);
      if (!countryFeature) return;

      if (!isInputting) {
         zoomToCountry(countryFeature as unknown as d3.GeoPermissibleObjects);
      }
   }, [countries, tippedCountryId, zoomToCountry, isInputting]);

   useEffect(() => {
      if (!isInputting) {
         resetZoom();
      }
   }, [isInputting, resetZoom]);

   return (
      <div className={styles.container}>
         <div className={styles.controls}>
            <button onClick={resetZoom} className={styles.controlButton}>Сбросить зум</button>
         </div>
         <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" className={styles.svg}>
            <g transform={`translate(${transform.translateX}, ${transform.translateY}) scale(${transform.scale})`}>
               {countries.map((data: IStatusedCountryItem) => {
                  const name = data.properties.name || data.id;
                  const isHovered = hovered === name;
                  const isSelected = selectedCountry === name;
                  const isTipped = tippedCountryId === data.id;

                  let fillColor = '#ddd';
                  if (data.status === 'found') fillColor = '#00ff59ff';
                  if (isHovered) fillColor = '#ffcc00';
                  if (isSelected) fillColor = '#ff8800';
                  if (isTipped) fillColor = '#66ccff';

                  return (
                     <path
                        key={data.id}
                        d={pathGenerator(data)}
                        fill={fillColor}
                        stroke='#333'
                        strokeWidth={isSelected ? 1.5 : 0.75}
                        onMouseEnter={() => setHovered(name)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => handleCountryClick(name, data.id, data)}
                     />
                  );
               })}
            </g>
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
      </div>
   )
}

export default WorldMap;