interface IAddressComponent {
  long_name: string;
  short_name: string;
  types: Array<string>;
}

interface IGeometry {
  bounds: {
    northeast: {
      lat: number;
      lng: number;
    },
    southwest: {
      lat: number;
      lng: number;
    }
  },
  location: {
    lat: number;
    lng: number;
  },
  location_type: string;
  viewport: {
    northeast: {
      lat: number;
      lng: number;
    },
    southwest: {
      lat: number;
      lng: number;
    }
  }
}

interface IResult {
  address_components: Array<IAddressComponent>,
  formatted_address: string,
  geometry: IGeometry,
  place_id: string,
  types: Array<string>
}

export interface ILocation {
  results: Array<IResult>,
  status: string;
}
