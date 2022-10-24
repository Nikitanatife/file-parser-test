import { Migration } from '@mikro-orm/migrations';

export class Migration20221024072958 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "department" drop column "local_id";');

    this.addSql('alter table "employee" drop column "local_id";');

    this.addSql('alter table "transaction" drop column "local_id";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "department" add column "local_id" int not null;');

    this.addSql('alter table "employee" add column "local_id" int not null;');

    this.addSql(
      'alter table "transaction" add column "local_id" int not null;',
    );
  }
}
