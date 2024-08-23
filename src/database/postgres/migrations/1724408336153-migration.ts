import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724408336153 implements MigrationInterface {
  name = 'Migration1724408336153';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP CONSTRAINT "FK_23d77f3a8a5715c6e1f42518dba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD CONSTRAINT "FK_23d77f3a8a5715c6e1f42518dba" FOREIGN KEY ("specializationId") REFERENCES "specializations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP CONSTRAINT "FK_23d77f3a8a5715c6e1f42518dba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD CONSTRAINT "FK_23d77f3a8a5715c6e1f42518dba" FOREIGN KEY ("specializationId") REFERENCES "specializations"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
