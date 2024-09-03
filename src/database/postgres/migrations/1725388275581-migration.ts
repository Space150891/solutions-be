import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1725388275581 implements MigrationInterface {
  name = 'Migration1725388275581';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'patient', 'doctor', 'nurse', 'staff')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "nurses" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "nurses" ADD CONSTRAINT "UQ_3fdf572d9686c7cc0014bde3902" UNIQUE ("userId")`,
    );
    await queryRunner.query(`ALTER TABLE "staff" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "UQ_eba76c23bcfc9dad2479b7fd2ad" UNIQUE ("userId")`,
    );
    await queryRunner.query(`ALTER TABLE "patients" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "patients" ADD CONSTRAINT "UQ_2c24c3490a26d04b0d70f92057a" UNIQUE ("userId")`,
    );
    await queryRunner.query(`ALTER TABLE "doctors" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD CONSTRAINT "UQ_55651e05e46413d510215535edf" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "nurses" ADD CONSTRAINT "FK_3fdf572d9686c7cc0014bde3902" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_eba76c23bcfc9dad2479b7fd2ad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" ADD CONSTRAINT "FK_2c24c3490a26d04b0d70f92057a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD CONSTRAINT "FK_55651e05e46413d510215535edf" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP CONSTRAINT "FK_55651e05e46413d510215535edf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients" DROP CONSTRAINT "FK_2c24c3490a26d04b0d70f92057a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK_eba76c23bcfc9dad2479b7fd2ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "nurses" DROP CONSTRAINT "FK_3fdf572d9686c7cc0014bde3902"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP CONSTRAINT "UQ_55651e05e46413d510215535edf"`,
    );
    await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "patients" DROP CONSTRAINT "UQ_2c24c3490a26d04b0d70f92057a"`,
    );
    await queryRunner.query(`ALTER TABLE "patients" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "UQ_eba76c23bcfc9dad2479b7fd2ad"`,
    );
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "nurses" DROP CONSTRAINT "UQ_3fdf572d9686c7cc0014bde3902"`,
    );
    await queryRunner.query(`ALTER TABLE "nurses" DROP COLUMN "userId"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}
