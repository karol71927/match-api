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

  async findAll(): Promise<Player[]> {
    return this.playerRepository.findAll();
  }

  async findOneByIdWithTeam(id: string): Promise<Player> {
    return this.playerRepository.findOneByIdWithTeam(id);
  }
}
