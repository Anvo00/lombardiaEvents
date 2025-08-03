import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1754236114519 implements MigrationInterface {
    name = 'Migration1754236114519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD COLUMN \`role\` enum('user', 'admin') NOT NULL DEFAULT 'user'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`user\`
            DROP COLUMN \`role\`
        `);
    }
}
