import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1725307785432 implements MigrationInterface {
  name = 'Migration1725307785432';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP CONSTRAINT "FK_f44fcdcd988350bec0f35ea8629"`,
    );
    await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "illnessesId"`);
    await queryRunner.query(
      `ALTER TABLE "patient-illness" ADD "patientId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-illness" ADD "doctorId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-illness" ADD CONSTRAINT "FK_1bef2b16579ee51953d8299cf2f" FOREIGN KEY ("patientId") REFERENCES "patient-medical-record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-illness" ADD CONSTRAINT "FK_3920ffebff587d4a05fdc6c428c" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patient-illness" DROP CONSTRAINT "FK_3920ffebff587d4a05fdc6c428c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-illness" DROP CONSTRAINT "FK_1bef2b16579ee51953d8299cf2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-illness" DROP COLUMN "doctorId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-illness" DROP COLUMN "patientId"`,
    );
    await queryRunner.query(`ALTER TABLE "doctors" ADD "illnessesId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD CONSTRAINT "FK_f44fcdcd988350bec0f35ea8629" FOREIGN KEY ("illnessesId") REFERENCES "patient-illness"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
