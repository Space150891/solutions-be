import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1725395644374 implements MigrationInterface {
  name = 'Migration1725395644374';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "patientId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_901039a35ef047c20cdb4b52092" UNIQUE ("patientId")`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "doctorId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_34bd2811972ab6cc0f96a4f6440" UNIQUE ("doctorId")`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "nurseId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_18cd3798d6831b1f12ef6980da1" UNIQUE ("nurseId")`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "staffId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_49f3f7c914660260c4c6de15686" UNIQUE ("staffId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_901039a35ef047c20cdb4b52092" FOREIGN KEY ("patientId") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_34bd2811972ab6cc0f96a4f6440" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_18cd3798d6831b1f12ef6980da1" FOREIGN KEY ("nurseId") REFERENCES "nurses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_49f3f7c914660260c4c6de15686" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_49f3f7c914660260c4c6de15686"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_18cd3798d6831b1f12ef6980da1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_34bd2811972ab6cc0f96a4f6440"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_901039a35ef047c20cdb4b52092"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_49f3f7c914660260c4c6de15686"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "staffId"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_18cd3798d6831b1f12ef6980da1"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "nurseId"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_34bd2811972ab6cc0f96a4f6440"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "doctorId"`);
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_901039a35ef047c20cdb4b52092"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "patientId"`);
  }
}
