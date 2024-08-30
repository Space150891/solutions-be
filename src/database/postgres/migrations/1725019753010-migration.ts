import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1725019753010 implements MigrationInterface {
  name = 'Migration1725019753010';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "first_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "last_name"`,
    );
    await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "additional_info" jsonb NOT NULL DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "additional_info"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "phone" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "last_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "first_name" character varying NOT NULL`,
    );
  }
}
