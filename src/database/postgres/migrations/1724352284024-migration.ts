import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724352284024 implements MigrationInterface {
  name = 'Migration1724352284024';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "doctors" ADD "patientsId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD CONSTRAINT "FK_71e1c92d3cd6b3313629b12d920" FOREIGN KEY ("patientsId") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP CONSTRAINT "FK_71e1c92d3cd6b3313629b12d920"`,
    );
    await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "patientsId"`);
  }
}
