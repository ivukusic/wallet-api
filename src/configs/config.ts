import { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 9000,
  },
  cors: {
    enabled: true,
  },
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
  },
  security: {
    expiresIn: '365d',
    refreshIn: '365d',
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;
