import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724656781156 implements MigrationInterface {
  name = 'Migration1724656781156';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "nurses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "gender" character varying NOT NULL, "rank" character varying NOT NULL, "department" character varying NOT NULL, "location" character varying NOT NULL, "hire_date" TIMESTAMP NOT NULL, "salary" numeric NOT NULL, "years_of_experience" integer NOT NULL, CONSTRAINT "PK_be1be6944982f072ca4f1d4b59a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "staff" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "gender" character varying NOT NULL, "role" character varying NOT NULL, "department" character varying NOT NULL, "locations" text NOT NULL DEFAULT '[]', "hire_date" TIMESTAMP NOT NULL, "salary" numeric NOT NULL, "years_of_experience" integer NOT NULL, "shift" character varying NOT NULL, CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "staff"`);
    await queryRunner.query(`DROP TABLE "nurses"`);
  }
}
