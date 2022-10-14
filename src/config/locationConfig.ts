interface ILocationConfig {
  provider: 'google' | 'sandbox',
  config: {
    google: {
      apiKey: string;
    }
  }
}

export default {
  provider: process.env.LOCATION_PROVIDER,
  config: {
    google: {
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
    }
  }
} as ILocationConfig;
