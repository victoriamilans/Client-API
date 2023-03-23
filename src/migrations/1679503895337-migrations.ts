import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1679503895337 implements MigrationInterface {
    name = 'migrations1679503895337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "telephone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "telephone" numeric NOT NULL`);
    }

}
