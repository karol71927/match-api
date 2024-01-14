import { Inject, Injectable } from '@nestjs/common';
import {
  PLAYER_REPOSITORY_TOKEN,
  PlayerRepositoryInterface,
} from '../repository/player/player.repository-interface';
import { Player } from '../model/player.model';

@Injectable()
export class PlayerService {
  constructor(
    @Inject(PLAYER_REPOSITORY_TOKEN)
    private readonly playerRepository: PlayerRepositoryInterface,
  ) {}

  async findAll(limit: number, offset: number): Promise<[Player[], number]> {
    return this.playerRepository.findAllWithPagination(limit, offset);
  }

  async findOneByIdWithTeam(id: string): Promise<Player> {
    return this.playerRepository.findOneByIdWithTeam(id);
  }
}
