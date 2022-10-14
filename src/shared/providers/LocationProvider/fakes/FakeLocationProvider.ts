import { ILocation } from "../interfaces";
import ILocationProvider from "../models/ILocationProvider";

export default class FakeLocationProvider implements ILocationProvider {
  async getLocation(): Promise<ILocation> {
    return {
      results: [],
      status: 'OK',
    }
  }
}
