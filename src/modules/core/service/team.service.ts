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

  async findAll(): Promise<Team[]> {
    return this.teamRepository.findAll();
  }

  async findOneByIdWithPlayers(id: string): Promise<Team> {
    return this.teamRepository.findOneByIdWithPlayers(id);
  }
}
