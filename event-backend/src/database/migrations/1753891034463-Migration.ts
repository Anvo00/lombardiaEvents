import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1753891034463 implements MigrationInterface {
    name = 'Migration1753891034463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`user_id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL DEFAULT ' ', \`password\` varchar(255) NOT NULL DEFAULT ' ', \`user_name\` varchar(255) NOT NULL DEFAULT ' ', \`user_surname\` varchar(255) NOT NULL DEFAULT ' ', \`email_address\` varchar(255) NOT NULL DEFAULT ' ', PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
