import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1705242881623 implements MigrationInterface {
  name = Migration1705242881623.name;

  /** to run this migration firstly you need to set
   * SET GLOBAL log_bin_trust_function_creators = 1;
   */
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TRIGGER before_insert_player_matches
      BEFORE INSERT ON player_matches
      FOR EACH ROW
      BEGIN
          DECLARE player_team_id VARCHAR(255);
          DECLARE match_team_count VARCHAR(255);
      
          -- Check if the player exists and is associated with a team
          SELECT team_id INTO player_team_id
          FROM players
          WHERE id = NEW.player_id;
      
          IF player_team_id IS NULL THEN
              SIGNAL SQLSTATE '45000'
              SET MESSAGE_TEXT = 'Player is not assigned to any team';
          END IF;
      
          -- Check if the team is part of the match
          SELECT COUNT(*) INTO match_team_count
          FROM team_matches tm
          WHERE tm.team_id = player_team_id AND tm.match_id = NEW.match_id;
      
          IF match_team_count = 0 THEN
              SIGNAL SQLSTATE '45000'
              SET MESSAGE_TEXT = 'Player is not assigned to a team participating in the match';
          END IF;
      END;`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TRIGGER before_insert_player_matches`);
  }
}
