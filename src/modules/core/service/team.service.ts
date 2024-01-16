import { Inject, Injectable } from '@nestjs/common';
import {
  TEAM_REPOSITORY_TOKEN,
  TeamRepositoryInterface,
} from '../repository/team/team.repository-interface';
import { Team } from '../model/team.model';

@Injectable()
export class TeamService {
  constructor(
    @Inject(TEAM_REPOSITORY_TOKEN)
    private readonly teamRepository: TeamRepositoryInterface,
  ) {}

  async findAll(limit: number, offset: number): Promise<[Team[], number]> {
    return this.teamRepository.findAllWithPagination(limit, offset);
  }

  async findOneByIdWithPlayers(id: string): Promise<Team> {
    return this.teamRepository.findOneByIdWithPlayers(id);
  }

  async findOneByPlayerId(playerId: string): Promise<Team> {
    return this.teamRepository.findOneByPlayerId(playerId);
  }

  async findByMatchIdWithPlayers(
    matchId: string,
    limit: number,
    offset: number,
  ): Promise<[Team[], number]> {
    return this.teamRepository.findByMatchIdWithPlayersWithPagination(
      matchId,
      limit,
      offset,
    );
  }
}
