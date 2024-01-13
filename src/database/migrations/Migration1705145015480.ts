import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1705145015480 implements MigrationInterface {
  name = Migration1705145015480.name;
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE team_matches (
      match_id VARCHAR(255) NOT NULL, 
      team_id VARCHAR(255) NOT NULL
    )`);

    await queryRunner.query(
      `ALTER TABLE team_matches
      ADD FOREIGN KEY (match_id) REFERENCES matches(id)`,
    );

    await queryRunner.query(
      `ALTER TABLE team_matches
      ADD FOREIGN KEY (team_id) REFERENCES teams(id)`,
    );

    await queryRunner.query(
      `ALTER TABLE team_matches
      ADD CONSTRAINT team_matches_unique UNIQUE (match_id, team_id)`,
    );
  }
  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE team_matches`);
  }
}
