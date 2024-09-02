import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1725306274440 implements MigrationInterface {
  name = 'Migration1725306274440';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "doctors" ADD "illnessesId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD CONSTRAINT "FK_f44fcdcd988350bec0f35ea8629" FOREIGN KEY ("illnessesId") REFERENCES "patient-illness"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors" DROP CONSTRAINT "FK_f44fcdcd988350bec0f35ea8629"`,
    );
    await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "illnessesId"`);
  }
}
