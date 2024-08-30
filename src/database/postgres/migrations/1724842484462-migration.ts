import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724842484462 implements MigrationInterface {
  name = 'Migration1724842484462';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patients" DROP CONSTRAINT "FK_3c256cdcc49e998e3db9d3fbb68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" DROP COLUMN "appointmentsId"`,
    );
    await queryRunner.query(`ALTER TABLE "appointments" ADD "doctorId" uuid`);
    await queryRunner.query(`ALTER TABLE "appointments" ADD "patientId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_0c1af27b469cb8dca420c160d65" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD CONSTRAINT "FK_13c2e57cb81b44f062ba24df57d" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_13c2e57cb81b44f062ba24df57d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP CONSTRAINT "FK_0c1af27b469cb8dca420c160d65"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "patientId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "doctorId"`,
    );
    await queryRunner.query(`ALTER TABLE "patients" ADD "appointmentsId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "patients" ADD CONSTRAINT "FK_3c256cdcc49e998e3db9d3fbb68" FOREIGN KEY ("appointmentsId") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
