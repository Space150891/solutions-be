import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724353852869 implements MigrationInterface {
  name = 'Migration1724353852869';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patients" DROP CONSTRAINT "FK_e04402164264ccd26c2ce21e4db"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP CONSTRAINT "FK_23d77f3a8a5715c6e1f42518dba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" RENAME COLUMN "doctorsId" TO "doctorId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" ADD CONSTRAINT "FK_c39435c71c0fff03449eb6b2332" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD CONSTRAINT "FK_23d77f3a8a5715c6e1f42518dba" FOREIGN KEY ("specializationId") REFERENCES "specializations"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP CONSTRAINT "FK_23d77f3a8a5715c6e1f42518dba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" DROP CONSTRAINT "FK_c39435c71c0fff03449eb6b2332"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" RENAME COLUMN "doctorId" TO "doctorsId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD CONSTRAINT "FK_23d77f3a8a5715c6e1f42518dba" FOREIGN KEY ("specializationId") REFERENCES "specializations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" ADD CONSTRAINT "FK_e04402164264ccd26c2ce21e4db" FOREIGN KEY ("doctorsId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
