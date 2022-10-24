import { Migration } from '@mikro-orm/migrations';

export class Migration20221022155943 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "transaction" add column "employee_id" int not null;',
    );
    this.addSql(
      'alter table "transaction" add constraint "transaction_employee_id_foreign" foreign key ("employee_id") references "employee" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "transaction" drop constraint "transaction_employee_id_foreign";',
    );

    this.addSql('alter table "transaction" drop column "employee_id";');
  }
}
