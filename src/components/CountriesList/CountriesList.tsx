import { type FC } from 'react';
import type { ICountryItem } from '../../types/countryTypes';

import styles from './CountriesList.module.scss';

interface ICountriesListProps {
   countries: ICountryItem[];
}

const CountriesList: FC<ICountriesListProps> = ({ countries }) => {
   return (
      <div className={styles.countriesContainer}>
         <ul className={styles.countriesList}>
            {countries.map(country => 
               <li key={country.id}>
                  {country.properties.name}
               </li>
            )}
         </ul>
      </div>
      
   )
}

export default CountriesList;