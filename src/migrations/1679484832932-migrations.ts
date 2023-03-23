import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1679484832932 implements MigrationInterface {
    name = 'migrations1679484832932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "password"`);
    }

}
