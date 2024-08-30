import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724923913369 implements MigrationInterface {
  name = 'Migration1724923913369';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "specializations" ADD CONSTRAINT "UQ_67217038a4b83e83bfbdf6d49ba" UNIQUE ("specialization")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "specializations" DROP CONSTRAINT "UQ_67217038a4b83e83bfbdf6d49ba"`,
    );
  }
}
