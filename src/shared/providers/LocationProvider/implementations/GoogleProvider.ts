import axios, { AxiosInstance } from 'axios';
import locationConfig from '../../../../config/locationConfig';
import { ILocation } from '../interfaces';

import ILocationProvider from "../models/ILocationProvider";

export default class GoogleProvider implements ILocationProvider {
  private provider: AxiosInstance;

  constructor() {
    const { apiKey } = locationConfig.config.google;

    this.provider = axios.create({
      baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: {
        key: apiKey,
      }
    })
  }

  public async getLocation(address: string): Promise<ILocation> {
    const { data } = await this.provider.get('', {
      params: {
        address,
      }
    });

    return data;
  }
}
