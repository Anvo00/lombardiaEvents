import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1754071399329 implements MigrationInterface {
    name = 'Migration1754071399329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ticket\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`event_name\` varchar(255) NOT NULL, \`event_date\` varchar(255) NOT NULL, \`event_location\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`purchaseDate\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`user_id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL DEFAULT ' ', \`password\` varchar(255) NOT NULL DEFAULT ' ', \`user_name\` varchar(255) NOT NULL DEFAULT ' ', \`user_surname\` varchar(255) NOT NULL DEFAULT ' ', \`email_address\` varchar(255) NOT NULL DEFAULT ' ', PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`ticket\``);
    }

}
