import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1705142201778 implements MigrationInterface {
  name = Migration1705142201778.name;

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE teams (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        name VARCHAR(255) NOT NULL
      )`,
    );

    await queryRunner.query(
      `ALTER TABLE teams
      ADD UNIQUE (name)`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE teams`);
  }
}
