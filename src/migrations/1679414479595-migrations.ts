import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1679414479595 implements MigrationInterface {
    name = 'migrations1679414479595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" RENAME COLUMN "registrationDate" TO "createdAt"`);
        await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "registrationDate" TO "createdAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "createdAt" TO "registrationDate"`);
        await queryRunner.query(`ALTER TABLE "clients" RENAME COLUMN "createdAt" TO "registrationDate"`);
    }

}
