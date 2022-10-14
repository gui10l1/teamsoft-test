import { ILocation } from "../interfaces";
import ILocationProvider from "../models/ILocationProvider";

export default class FakeLocationProvider implements ILocationProvider {
  async getLocation(): Promise<ILocation> {
    return {
      results: [
        {
          address_components: [
            {
              long_name: 'Long name',
              short_name: 'Short name',
              types: [],
            }
          ],
          formatted_address: 'Formatted address',
          geometry: {
            bounds: {
              northeast: {
                lat: 1.123165,
                lng: -9.4665,
              },
              southwest: {
                lat: 40.45645,
                lng: 9.464656,
              }
            },
            location: {
              lat: -9.154546456,
              lng: 2.456456
            },
            location_type: 'Location type',
            viewport: {
              northeast: {
                lat: 1.123165,
                lng: -9.4665,
              },
              southwest: {
                lat: 40.45645,
                lng: 9.464656,
              }
            },
          },
          place_id: 'place_id',
          types: []
        }
      ],
      status: 'OK',
    }
  }
}
