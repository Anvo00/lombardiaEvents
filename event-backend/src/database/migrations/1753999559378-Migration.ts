import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1753999559378 implements MigrationInterface {
    name = 'Migration1753999559378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`user_id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL DEFAULT ' ', \`password\` varchar(255) NOT NULL DEFAULT ' ', \`user_name\` varchar(255) NOT NULL DEFAULT ' ', \`user_surname\` varchar(255) NOT NULL DEFAULT ' ', \`email_address\` varchar(255) NOT NULL DEFAULT ' ', PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ticket\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`event_name\` varchar(255) NOT NULL, \`event_date\` varchar(255) NOT NULL, \`event_location\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`purchaseDate\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ticket\` ADD CONSTRAINT \`FK_0e01a7c92f008418bad6bad5919\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ticket\` DROP FOREIGN KEY \`FK_0e01a7c92f008418bad6bad5919\``);
        await queryRunner.query(`DROP TABLE \`ticket\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
