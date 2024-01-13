import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1705146118400 implements MigrationInterface {
  name = Migration1705146118400.name;

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE player_matches (
        player_id VARCHAR(255) NOT NULL,
        match_id VARCHAR(255) NOT NULL
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE player_matches
      ADD FOREIGN KEY (match_id) REFERENCES matches(id)`,
    );

    await queryRunner.query(
      `ALTER TABLE player_matches
      ADD FOREIGN KEY (player_id) REFERENCES players(id)`,
    );

    await queryRunner.query(
      `ALTER TABLE player_matches
      ADD CONSTRAINT player_matches_unique UNIQUE (match_id, player_id)`,
    );
  }
  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE player_matches`);
  }
}
