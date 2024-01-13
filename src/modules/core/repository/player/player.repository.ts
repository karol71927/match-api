import { DataSource, Repository } from 'typeorm';
import { PlayerRepositoryInterface } from './player.repository-interface';
import { Player } from '../../model/player.model';

export class PlayerRepository
  extends Repository<Player>
  implements PlayerRepositoryInterface
{
  constructor(private readonly datasource: DataSource) {
    super(Player, datasource.createEntityManager());
  }

  async findAll(): Promise<Player[]> {
    return this.find({});
  }

  async findOneByIdWithTeam(id: string): Promise<Player> {
    return this.findOne({
      where: { id },
      relationLoadStrategy: 'join',
      relations: ['team'],
    });
  }
}
