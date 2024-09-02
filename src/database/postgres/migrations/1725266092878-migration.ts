import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1725266092878 implements MigrationInterface {
  name = 'Migration1725266092878';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patient-medical-record" ADD "patientId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-medical-record" ADD CONSTRAINT "UQ_083235035d169ff32109572b201" UNIQUE ("patientId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-medical-record" ADD CONSTRAINT "FK_083235035d169ff32109572b201" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patient-medical-record" DROP CONSTRAINT "FK_083235035d169ff32109572b201"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-medical-record" DROP CONSTRAINT "UQ_083235035d169ff32109572b201"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-medical-record" DROP COLUMN "patientId"`,
    );
  }
}
