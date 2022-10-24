import { Migration } from '@mikro-orm/migrations';

export class Migration20221024061925 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "department" add constraint "department_local_id_unique" unique ("local_id");',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "department" drop constraint "department_local_id_unique";',
    );
  }
}
