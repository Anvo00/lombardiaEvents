import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1765753827886 implements MigrationInterface {
    name = 'Migration1765753827886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorite_event" ("user_id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "eventId" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_favorite_event" ("user_id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "eventId" integer NOT NULL, "userId" integer, CONSTRAINT "FK_6e7a0daf21d217e7bf3a99678d4" FOREIGN KEY ("userId") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_favorite_event"("user_id", "eventId", "userId") SELECT "user_id", "eventId", "userId" FROM "favorite_event"`);
        await queryRunner.query(`DROP TABLE "favorite_event"`);
        await queryRunner.query(`ALTER TABLE "temporary_favorite_event" RENAME TO "favorite_event"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_event" RENAME TO "temporary_favorite_event"`);
        await queryRunner.query(`CREATE TABLE "favorite_event" ("user_id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "eventId" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "favorite_event"("user_id", "eventId", "userId") SELECT "user_id", "eventId", "userId" FROM "temporary_favorite_event"`);
        await queryRunner.query(`DROP TABLE "temporary_favorite_event"`);
        await queryRunner.query(`DROP TABLE "favorite_event"`);
    }

}
