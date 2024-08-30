import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724929594628 implements MigrationInterface {
  name = 'Migration1724929594628';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "status"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patients" ADD "status" character varying NOT NULL`,
    );
  }
}
