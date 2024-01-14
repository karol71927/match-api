import { ObjectType } from '@nestjs/graphql';
import relayTypes from '../../../../shared/graphql-relay/graphql-relay.types';
import { Team } from '../../model/team.model';

@ObjectType()
export class TeamResponse extends relayTypes<Team>(Team) {}
