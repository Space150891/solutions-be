import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724842139595 implements MigrationInterface {
  name = 'Migration1724842139595';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "timeFrom" TIMESTAMP NOT NULL, "timeTo" TIMESTAMP NOT NULL, "location" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "description" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "patients" ADD "appointmentsId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "patients" ADD CONSTRAINT "FK_3c256cdcc49e998e3db9d3fbb68" FOREIGN KEY ("appointmentsId") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patients" DROP CONSTRAINT "FK_3c256cdcc49e998e3db9d3fbb68"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" DROP COLUMN "appointmentsId"`,
    );
    await queryRunner.query(`DROP TABLE "appointments"`);
  }
}
