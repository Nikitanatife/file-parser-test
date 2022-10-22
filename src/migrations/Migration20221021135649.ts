import { Migration } from '@mikro-orm/migrations';

export class Migration20221021135649 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `create table "department" (
            "id" serial primary key, 
            "created_at" timestamp not null default \'now()\', 
            "updated_at" timestamp not null default \'now()\', 
            "name" varchar(255) not null
            );`,
    );

    this.addSql(
      `create table "employee" (
            "id" serial primary key, 
            "created_at" timestamp not null default \'now()\', 
            "updated_at" timestamp not null default \'now()\', 
            "name" varchar(255) not null, 
            "surname" varchar(255) not null
            );`,
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "department" cascade;');

    this.addSql('drop table if exists "employee" cascade;');
  }
}
