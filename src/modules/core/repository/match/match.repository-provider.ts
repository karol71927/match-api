import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DATA_SOURCE_INJECTION_TOKEN } from '../../../../database/data-source.injection-token';
import { MatchRepository } from './match.repository';
import {
  MATCH_REPOSITORY_TOKEN,
  MatchRepositoryInterface,
} from './match.repository-interface';

export const matchRepositoryProvider: Provider = {
  provide: MATCH_REPOSITORY_TOKEN,
  useFactory(dataSource: DataSource): MatchRepositoryInterface {
    return new MatchRepository(dataSource);
  },
  inject: [DATA_SOURCE_INJECTION_TOKEN],
};
