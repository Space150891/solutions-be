import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1725265489639 implements MigrationInterface {
  name = 'Migration1725265489639';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "patient-illness" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "illness" character varying NOT NULL, "diagnosis" character varying NOT NULL, "treatment" character varying NOT NULL, "prescription" character varying NOT NULL, "date" character varying NOT NULL, "patientId" uuid, CONSTRAINT "PK_70f0186ca1cebbe9e0013099f8b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "patient-medical-record" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "dob" character varying NOT NULL, "sex" character varying NOT NULL, "bloodType" character varying NOT NULL, "height" character varying NOT NULL, "weight" character varying NOT NULL, "address" character varying NOT NULL, "illnessesId" uuid, CONSTRAINT "PK_8c97d23e26281cd8809794b3e63" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-illness" ADD CONSTRAINT "FK_1bef2b16579ee51953d8299cf2f" FOREIGN KEY ("patientId") REFERENCES "patient-medical-record"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-medical-record" ADD CONSTRAINT "FK_ef5b80012bb191969105291056b" FOREIGN KEY ("illnessesId") REFERENCES "patient-illness"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "patient-medical-record" DROP CONSTRAINT "FK_ef5b80012bb191969105291056b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patient-illness" DROP CONSTRAINT "FK_1bef2b16579ee51953d8299cf2f"`,
    );
    await queryRunner.query(`DROP TABLE "patient-medical-record"`);
    await queryRunner.query(`DROP TABLE "patient-illness"`);
  }
}
