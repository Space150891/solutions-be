import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1725308099451 implements MigrationInterface {
  name = 'Migration1725308099451';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patient-illness" DROP CONSTRAINT "FK_1bef2b16579ee51953d8299cf2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-illness" RENAME COLUMN "patientId" TO "patientRecordId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-illness" ADD CONSTRAINT "FK_94dc01cf7b97f9bdda39f1c9b9c" FOREIGN KEY ("patientRecordId") REFERENCES "patient-medical-record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patient-illness" DROP CONSTRAINT "FK_94dc01cf7b97f9bdda39f1c9b9c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-illness" RENAME COLUMN "patientRecordId" TO "patientId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-illness" ADD CONSTRAINT "FK_1bef2b16579ee51953d8299cf2f" FOREIGN KEY ("patientId") REFERENCES "patient-medical-record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
