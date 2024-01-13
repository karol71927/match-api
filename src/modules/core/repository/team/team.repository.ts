import { DataSource, Repository } from 'typeorm';
import { TeamRepositoryInterface } from './team.repository-interface';
import { Team } from '../../model/team.model';

export class TeamRepository
  extends Repository<Team>
  implements TeamRepositoryInterface
{
  constructor(private readonly datasource: DataSource) {
    super(Team, datasource.createEntityManager());
  }

  async findAll(): Promise<Team[]> {
    return this.find({});
  }

  async findOneByIdWithPlayers(id: string): Promise<Team> {
    return this.findOne({
      where: { id },
      relationLoadStrategy: 'join',
      relations: ['players'],
    });
  }
}
