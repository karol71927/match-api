import { ObjectType } from '@nestjs/graphql';
import relayTypes from '../../../../shared/graphql-relay/graphql-relay.types';
import { Match } from '../../model/match.model';

@ObjectType()
export class MatchResponse extends relayTypes<Match>(Match) {}
