import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1679610004042 implements MigrationInterface {
    name = 'migrations1679610004042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" ALTER COLUMN "isDefault" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" ALTER COLUMN "isDefault" DROP DEFAULT`);
    }

}
