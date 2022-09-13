import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5532,
  username: 'postgres',
  password: 'postgres',
  database: 'task-management',
  synchronize: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};
