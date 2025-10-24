import { useState, type FC } from 'react';
import * as d3 from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from '../assets/world-110m.json';
import type { ICountryItem } from '../types/countryTypes';

import styles from './WordMap.module.scss';

const WorldMap: FC = () => {
   const [hovered, setHovered] = useState<string | null>(null);

   const projection = d3.geoMercator().scale(100).translate([400, 250]);
   const pathGenerator = d3.geoPath().projection(projection);

   const countries = feature(worldData, worldData.objects.countries).features;

   return (
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
                  onClick={() => console.log(data.properties.name || data.id)}
               />
            )
         })}
      </svg>
   )
}

export default WorldMap;