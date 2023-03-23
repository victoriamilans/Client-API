import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1679414319425 implements MigrationInterface {
    name = 'migrations1679414319425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" ALTER COLUMN "registrationDate" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "registrationDate" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ALTER COLUMN "registrationDate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "contacts" ALTER COLUMN "registrationDate" DROP DEFAULT`);
    }

}
