import { ILocation } from "../interfaces";

export default interface ILocationProvider {
  getLocation(address: string): Promise<ILocation>;
}
