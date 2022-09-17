import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'ayanori',
  password: 'postgres',
  database: 'task-management',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
