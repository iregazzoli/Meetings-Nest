import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from 'src/users/user.entity';
import { DATA_SOURCE } from '../constants'; 

export const DataSourceProvider = {
  provide: DATA_SOURCE,
  useFactory: async () => getInitializedDataSource(),
};

export const getInitializedDataSource = (database?: string, port?: string): Promise<DataSource> => {
  const isTestEnvironment = process.env.NODE_ENV === 'test';
  const host = isTestEnvironment ? process.env.TEST_POSTGRES_HOST : process.env.POSTGRES_HOST;
  const selectedPort = parseInt(port || (isTestEnvironment ? process.env.TEST_POSTGRES_DEFAULT_PORT : process.env.POSTGRES_DEFAULT_PORT));
  
  console.log(`Connecting to ${isTestEnvironment ? 'test' : 'development'} database at ${host}:${selectedPort}`);

  const dataSource = new DataSource({
    type: 'postgres',
    host: host,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    entities: [User],
    database: database || process.env.POSTGRES_DEFAULT_DB,
    port: selectedPort,
  } as DataSourceOptions);

  return dataSource.initialize();
};