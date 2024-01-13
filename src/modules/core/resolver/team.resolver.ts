import { Query, Resolver } from '@nestjs/graphql';
import { Team } from '../model/team.model';
import { TeamService } from '../service/team.service';

@Resolver((of) => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Query((returns) => [Team])
  async findAllTeams(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Query((returns) => Team)
  async findOneTeamByIdWithPlayers(id: string): Promise<Team> {
    return this.teamService.findOneByIdWithPlayers(id);
  }
}
