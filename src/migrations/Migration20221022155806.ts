import { Migration } from '@mikro-orm/migrations';

export class Migration20221022155806 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "employee" add column "department_id" int not null;',
    );
    this.addSql(
      'alter table "employee" add constraint "employee_department_id_foreign" foreign key ("department_id") references "department" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "employee" drop constraint "employee_department_id_foreign";',
    );

    this.addSql('alter table "employee" drop column "department_id";');
  }
}
