interface IMongoDbConfig {
  host: string;
  password?: string;
}

export default {
  host: process.env.MONGODB_CONNECTION_URI,
  password: process.env.MONGODB_CONNECTION_PASSWORD
} as IMongoDbConfig;
