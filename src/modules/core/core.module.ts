import { Module } from '@nestjs/common';
import { TeamResolver } from './resolver/team.resolver';
import { TeamService } from './service/team.service';
import { PlayerResolver } from './resolver/player.resolver';
import { MatchResolver } from './resolver/match.resolver';
import { teamRepositoryProvider } from './repository/team/team.repository-provider';
import { DatabaseModule } from '../../database/database.module';
import { matchRepositoryProvider } from './repository/match/match.repository-provider';
import { playerRepositoryProvider } from './repository/player/player.repository-provider';
import { PlayerService } from './service/player.service';
import { MatchService } from './service/match.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    //resolvers
    TeamResolver,
    PlayerResolver,
    MatchResolver,

    //services
    TeamService,
    PlayerService,
    MatchService,

    //repositories
    teamRepositoryProvider,
    playerRepositoryProvider,
    matchRepositoryProvider,
  ],
})
export class CoreModule {}
