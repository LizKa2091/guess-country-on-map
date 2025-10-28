export interface ICountryItem {
   geometry: IGeometry;
   id: string;
   properties: IProperty;
   type?: string;
}

export interface IStatusedCountryItem extends ICountryItem {
   status: 'not found' | 'found';
}

interface IProperty {
   name?: string
}

interface IGeometry {
   coordinates: number[];
   type?: string;
}