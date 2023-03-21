import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1679434126415 implements MigrationInterface {
    name = 'migrations1679434126415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "deletedAt"`);
    }

}
