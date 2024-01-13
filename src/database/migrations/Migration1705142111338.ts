import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1705142111338 implements MigrationInterface {
  name = Migration1705142111338.name;

  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE matches (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        address VARCHAR(255) NOT NULL,
        occurs_at DATETIME NOT NULL
      )`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE matches`);
  }
}
