import { Migration } from '@mikro-orm/migrations';

export class Migration20221021141735 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      `create table "transaction" (
            "id" serial primary key, 
            "created_at" timestamp not null default \'now()\', 
            "updated_at" timestamp not null default \'now()\', 
            "date" date not null, 
            "amount" int not null, 
            "currency" varchar(255) not null, 
            "type" text check ("type" in (\'salary\', \'donation\')) not null
            );`,
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "transaction" cascade;');
  }
}
