import { Migration } from '@mikro-orm/migrations';

export class Migration20221022183727 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "transaction" alter column "currency" type varchar(255) using ("currency"::varchar(255));',
    );
    this.addSql(
      'alter table "transaction" alter column "currency" drop not null;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "transaction" alter column "currency" type varchar(255) using ("currency"::varchar(255));',
    );
    this.addSql(
      'alter table "transaction" alter column "currency" set not null;',
    );
  }
}
