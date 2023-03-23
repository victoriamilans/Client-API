import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1679523537254 implements MigrationInterface {
    name = 'migrations1679523537254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "isActive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "isActive"`);
    }

}
