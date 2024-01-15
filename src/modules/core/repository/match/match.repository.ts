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

  async findAllWithPagination(
    limit: number,
    offset: number,
  ): Promise<[Match[], number]> {
    return this.findAndCount({ skip: offset, take: limit });
  }

  async findOneByIdWithTeamsAndPlayers(id: string): Promise<Match> {
    return this.findOne({
      where: { id },
      relationLoadStrategy: 'join',
      relations: ['teams', 'players'],
    });
  }

  async findByPlayerIdWithPagination(
    playerId: string,
    limit: number,
    offset: number,
  ): Promise<[Match[], number]> {
    return this.findAndCount({
      take: limit,
      skip: offset,
      where: {
        players: {
          id: playerId,
        },
      },
      relationLoadStrategy: 'join',
      relations: ['players.team'],
    });
  }
}
