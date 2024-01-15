import { Provider } from '@nestjs/common';
import { DatabaseEnvironmentVariables } from './config/database.environment-variables';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Match } from '../modules/core/model/match.model';
import { Player } from '../modules/core/model/player.model';
import { Team } from '../modules/core/model/team.model';
import { DATA_SOURCE_INJECTION_TOKEN } from './data-source.injection-token';
import { migrations } from './migrations';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeormProvider: Provider = {
  provide: DATA_SOURCE_INJECTION_TOKEN,
  useFactory: (configService: ConfigService<DatabaseEnvironmentVariables>) => {
    const dataSource = new DataSource({
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: parseInt(configService.get<string>('DB_PORT'), 10),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      synchronize: false,
      entities: [Match, Player, Team],
      migrations: migrations,
      migrationsTableName: 'migrations',
      migrationsRun: true,
      logging: process.env.NODE_ENV !== 'production' ? false : 'all',
      namingStrategy: new SnakeNamingStrategy(),
    });
    return dataSource.initialize();
  },
  inject: [ConfigService],
};
