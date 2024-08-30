import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724935214741 implements MigrationInterface {
  name = 'Migration1724935214741';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" ALTER COLUMN "status" SET DEFAULT 'pending'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" ALTER COLUMN "status" DROP DEFAULT`,
    );
  }
}
