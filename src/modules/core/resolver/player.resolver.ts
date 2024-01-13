import { Query, Resolver } from '@nestjs/graphql';
import { Player } from '../model/player.model';
import { PlayerService } from '../service/player.service';

@Resolver((of) => Player)
export class PlayerResolver {
  constructor(private readonly playerService: PlayerService) {}

  @Query((returns) => [Player])
  async findAllPlayers(): Promise<Player[]> {
    return this.playerService.findAll();
  }

  @Query((returns) => Player)
  async findOnePlayerByIdWithTeam(id: string): Promise<Player> {
    return this.playerService.findOneByIdWithTeam(id);
  }
}
