import { type FC } from 'react';

import styles from './CountriesList.module.scss';
import { useCountries } from '../../store/countriesStore';

const CountriesList: FC = () => {
   const { countries } = useCountries();
   
   const foundCountries = countries.filter((country) => country.status === 'found');
   const notFoundCountries = countries.filter((country) => country.status === 'not found');

   return (
      <div className={styles.countriesContainer}>
         <p>Ненайденные страны:</p>
         <ul className={styles.countriesList}>
            {notFoundCountries.map(country => 
               <li key={country.id} className={styles.notFoundCountry}>
                  {country.properties.name}
               </li>
            )}
         </ul>

         <p>Найденные страны:</p>
         <ul className={styles.countriesList}>
            {foundCountries.map(country => 
               <li key={country.id} className={styles.foundCountry}>
                  {country.properties.name}
               </li>
            )}
         </ul>
      </div>
   )
}

export default CountriesList;