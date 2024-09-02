import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1725309671455 implements MigrationInterface {
  name = 'Migration1725309671455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patient-medical-record" DROP CONSTRAINT "FK_083235035d169ff32109572b201"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" DROP CONSTRAINT "FK_4ca58a4a589fb30a6a55a06cdf4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-medical-record" ADD CONSTRAINT "FK_083235035d169ff32109572b201" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" ADD CONSTRAINT "FK_4ca58a4a589fb30a6a55a06cdf4" FOREIGN KEY ("medicalRecordId") REFERENCES "patient-medical-record"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patients" DROP CONSTRAINT "FK_4ca58a4a589fb30a6a55a06cdf4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-medical-record" DROP CONSTRAINT "FK_083235035d169ff32109572b201"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" ADD CONSTRAINT "FK_4ca58a4a589fb30a6a55a06cdf4" FOREIGN KEY ("medicalRecordId") REFERENCES "patient-medical-record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-medical-record" ADD CONSTRAINT "FK_083235035d169ff32109572b201" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
