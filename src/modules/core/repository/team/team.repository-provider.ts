import { DataSource } from 'typeorm';
import { Provider } from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { DATA_SOURCE_INJECTION_TOKEN } from '../../../../database/data-source.injection-token';
import { TEAM_REPOSITORY_TOKEN } from './team.repository-interface';

export const teamRepositoryProvider: Provider = {
  provide: TEAM_REPOSITORY_TOKEN,
  useFactory(dataSource: DataSource) {
    return new TeamRepository(dataSource);
  },
  inject: [DATA_SOURCE_INJECTION_TOKEN],
};
