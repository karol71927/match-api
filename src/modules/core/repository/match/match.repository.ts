import { DataSource, Repository } from 'typeorm';
import { MatchRepositoryInterface } from './match.repository-interface';
import { Match } from '../../model/match.model';

export class MatchRepository
  extends Repository<Match>
  implements MatchRepositoryInterface
{
  constructor(private readonly datasource: DataSource) {
    super(Match, datasource.createEntityManager());
  }

  async findAll(): Promise<Match[]> {
    return this.find();
  }

  async findOneByIdWithTeamsAndPlayers(id: string): Promise<Match> {
    return this.findOne({
      where: { id },
      relationLoadStrategy: 'join',
      relations: ['teams', 'players'],
    });
  }
}
