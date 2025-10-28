export interface ICountryItem {
   geometry: IGeometry;
   id: string;
   properties: IProperty;
   type?: string;
}

interface IProperty {
   name?: string
}

interface IGeometry {
   coordinates: number[];
   type?: string;
}