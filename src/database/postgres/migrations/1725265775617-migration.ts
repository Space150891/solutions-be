import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1725265775617 implements MigrationInterface {
  name = 'Migration1725265775617';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patient-illness" DROP CONSTRAINT "FK_1bef2b16579ee51953d8299cf2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-medical-record" DROP CONSTRAINT "FK_ef5b80012bb191969105291056b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-illness" DROP COLUMN "patientId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-medical-record" DROP COLUMN "illnessesId"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patient-medical-record" ADD "illnessesId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-illness" ADD "patientId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-medical-record" ADD CONSTRAINT "FK_ef5b80012bb191969105291056b" FOREIGN KEY ("illnessesId") REFERENCES "patient-illness"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-illness" ADD CONSTRAINT "FK_1bef2b16579ee51953d8299cf2f" FOREIGN KEY ("patientId") REFERENCES "patient-medical-record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
