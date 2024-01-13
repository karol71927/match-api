import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1705142245119 implements MigrationInterface {
  name = Migration1705142245119.name;

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE players (
      id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      number INT NOT NULL,
      team_id VARCHAR(36)
    )`,
    );

    await queryRunner.query(
      `ALTER TABLE players
    ADD FOREIGN KEY (team_id) REFERENCES teams(id)`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE players`);
  }
}
