import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1679525384035 implements MigrationInterface {
    name = 'migrations1679525384035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" RENAME COLUMN "telephone" TO "phone"`);
        await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "telephone" TO "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "phone" TO "telephone"`);
        await queryRunner.query(`ALTER TABLE "clients" RENAME COLUMN "phone" TO "telephone"`);
    }

}
