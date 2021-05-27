import {MigrationInterface, QueryRunner} from "typeorm";

export class init1622086827903 implements MigrationInterface {
    name = 'init1622086827903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "seasons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "starting" date NOT NULL, "ending" date NOT NULL, CONSTRAINT "PK_cb8ed53b5fe109dcd4a4449ec9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "topic" character varying NOT NULL, "duration" integer NOT NULL, "activities" integer, "recognitionType" character varying NOT NULL, "url" character varying NOT NULL, "claveCurso" character varying NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "seasonId" uuid, CONSTRAINT "UQ_34fb5d3df13ee6482942d1e3c5d" UNIQUE ("claveCurso"), CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grades" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "grade" integer NOT NULL, "activity" integer NOT NULL, "studentId" uuid, "courseId" uuid, CONSTRAINT "PK_4740fb6f5df2505a48649f1687b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d00b9459bbb3cc847f6d9f5d20" ON "grades" ("courseId", "studentId", "activity") `);
        await queryRunner.query(`CREATE TABLE "students" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "paternal_name" character varying NOT NULL, "maternal_name" character varying NOT NULL, "country" character varying NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "email" character varying NOT NULL, "allyId" uuid, CONSTRAINT "UQ_fa8c3b4233deabc0917380ef4ef" UNIQUE ("username"), CONSTRAINT "UQ_25985d58c714a4a427ced57507b" UNIQUE ("email"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "allies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "vanity_id" character varying NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "email" character varying, "contact" character varying, CONSTRAINT "UQ_c1747aed3542e6a2d520b6cca25" UNIQUE ("vanity_id"), CONSTRAINT "UQ_cd7d59f297e925a3953b06ee9cb" UNIQUE ("name"), CONSTRAINT "PK_04849cdc15edb45d2c2b1d25509" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "paternalName" character varying NOT NULL, "maternalName" character varying NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "hasAccountEnabled" boolean NOT NULL DEFAULT false, "roleId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "roles_name_enum" AS ENUM('SUPERADMIN', 'SUPERVISOR', 'TUTOR', 'ALLY')`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "roles_name_enum" NOT NULL, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_courses" ("courseKey" character varying NOT NULL, "studentId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_236759c766f32664ffbcfb30dba" PRIMARY KEY ("courseKey", "studentId"))`);
        await queryRunner.query(`CREATE TABLE "supervisor_courses" ("courseKey" character varying NOT NULL, "supervisorId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9eb90d3c2a39efd7de4b06dbe78" PRIMARY KEY ("courseKey", "supervisorId"))`);
        await queryRunner.query(`CREATE TABLE "tutor_courses" ("courseKey" character varying NOT NULL, "tutorId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d5166df40ff26cf42aca18e0473" PRIMARY KEY ("courseKey", "tutorId"))`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_b411dbb0ba82c8c249c9fb2c46c" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grades" ADD CONSTRAINT "FK_fcfc027e4e5fb37a4372e688070" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "grades" ADD CONSTRAINT "FK_ff09424ef05361e1c47fa03d82b" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_428aeeb416179b2ccda9e902553" FOREIGN KEY ("allyId") REFERENCES "allies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_courses" ADD CONSTRAINT "FK_97e78723f12bbc5d38b67e22552" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "supervisor_courses" ADD CONSTRAINT "FK_f2cd9fe39c82cd8c8607ad5ab7e" FOREIGN KEY ("supervisorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tutor_courses" ADD CONSTRAINT "FK_6eaf1d1f08b3ef98ac0cd47b6ba" FOREIGN KEY ("tutorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tutor_courses" DROP CONSTRAINT "FK_6eaf1d1f08b3ef98ac0cd47b6ba"`);
        await queryRunner.query(`ALTER TABLE "supervisor_courses" DROP CONSTRAINT "FK_f2cd9fe39c82cd8c8607ad5ab7e"`);
        await queryRunner.query(`ALTER TABLE "student_courses" DROP CONSTRAINT "FK_97e78723f12bbc5d38b67e22552"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_428aeeb416179b2ccda9e902553"`);
        await queryRunner.query(`ALTER TABLE "grades" DROP CONSTRAINT "FK_ff09424ef05361e1c47fa03d82b"`);
        await queryRunner.query(`ALTER TABLE "grades" DROP CONSTRAINT "FK_fcfc027e4e5fb37a4372e688070"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_b411dbb0ba82c8c249c9fb2c46c"`);
        await queryRunner.query(`DROP TABLE "tutor_courses"`);
        await queryRunner.query(`DROP TABLE "supervisor_courses"`);
        await queryRunner.query(`DROP TABLE "student_courses"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TYPE "roles_name_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "allies"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP INDEX "IDX_d00b9459bbb3cc847f6d9f5d20"`);
        await queryRunner.query(`DROP TABLE "grades"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "seasons"`);
    }

}
