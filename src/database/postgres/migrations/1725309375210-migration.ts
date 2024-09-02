import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1725309375210 implements MigrationInterface {
  name = 'Migration1725309375210';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patients" ADD "medicalRecordId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" ADD CONSTRAINT "UQ_4ca58a4a589fb30a6a55a06cdf4" UNIQUE ("medicalRecordId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" ADD CONSTRAINT "FK_4ca58a4a589fb30a6a55a06cdf4" FOREIGN KEY ("medicalRecordId") REFERENCES "patient-medical-record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patients" DROP CONSTRAINT "FK_4ca58a4a589fb30a6a55a06cdf4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" DROP CONSTRAINT "UQ_4ca58a4a589fb30a6a55a06cdf4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" DROP COLUMN "medicalRecordId"`,
    );
  }
}
