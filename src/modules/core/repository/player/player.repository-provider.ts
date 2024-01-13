import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DATA_SOURCE_INJECTION_TOKEN } from '../../../../database/data-source.injection-token';
import { PlayerRepository } from './player.repository';
import { PLAYER_REPOSITORY_TOKEN } from './player.repository-interface';

export const playerRepositoryProvider: Provider = {
  provide: PLAYER_REPOSITORY_TOKEN,
  useFactory: (dataSource: DataSource) => {
    return new PlayerRepository(dataSource);
  },
  inject: [DATA_SOURCE_INJECTION_TOKEN],
};
