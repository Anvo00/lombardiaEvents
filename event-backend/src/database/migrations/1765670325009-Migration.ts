import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1765670325009 implements MigrationInterface {
    name = 'Migration1765670325009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("user_id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL DEFAULT (' '), "password" varchar NOT NULL DEFAULT (' '), "user_name" varchar NOT NULL DEFAULT (' '), "user_surname" varchar NOT NULL DEFAULT (' '), "email_address" varchar NOT NULL DEFAULT (' '), "role" varchar CHECK( "role" IN ('user','admin') ) NOT NULL DEFAULT ('user'), "google_id" varchar, "provider" varchar NOT NULL DEFAULT ('local'))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("user_id", "username", "password", "user_name", "user_surname", "email_address", "role") SELECT "user_id", "username", "password", "user_name", "user_surname", "email_address", "role" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("user_id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL DEFAULT (' '), "password" varchar NOT NULL DEFAULT (' '), "user_name" varchar NOT NULL DEFAULT (' '), "user_surname" varchar NOT NULL DEFAULT (' '), "email_address" varchar NOT NULL DEFAULT (' '), "role" varchar CHECK( "role" IN ('user','admin') ) NOT NULL DEFAULT ('user'))`);
        await queryRunner.query(`INSERT INTO "user"("user_id", "username", "password", "user_name", "user_surname", "email_address", "role") SELECT "user_id", "username", "password", "user_name", "user_surname", "email_address", "role" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
