import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1764869395799 implements MigrationInterface {
    name = 'Migration1764869395799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ticket" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer NOT NULL, "eventId" integer NOT NULL, "event_name" varchar NOT NULL, "event_date" varchar NOT NULL, "event_location" varchar NOT NULL, "price" integer NOT NULL DEFAULT (0), "purchaseDate" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("user_id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL DEFAULT (' '), "password" varchar NOT NULL DEFAULT (' '), "user_name" varchar NOT NULL DEFAULT (' '), "user_surname" varchar NOT NULL DEFAULT (' '), "email_address" varchar NOT NULL DEFAULT (' '), "role" varchar CHECK( "role" IN ('user','admin') ) NOT NULL DEFAULT ('user'))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
    }

}
