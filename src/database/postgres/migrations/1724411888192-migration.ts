import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724411888192 implements MigrationInterface {
  name = 'Migration1724411888192';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD "description" character varying NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "description"`);
  }
}
