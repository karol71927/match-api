import { ObjectType } from '@nestjs/graphql';
import relayTypes from '../../../../shared/graphql-relay/graphql-relay.types';
import { Player } from '../../model/player.model';

@ObjectType()
export class PlayerResponse extends relayTypes<Player>(Player) {}
