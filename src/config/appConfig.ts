interface IAppConfig {
  appPort: string;
}

export default {
  appPort: process.env.APP_PORT,
} as IAppConfig;
