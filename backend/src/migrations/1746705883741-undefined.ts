import { MigrationInterface, QueryRunner } from 'typeorm';

export class Undefined1746705883741 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE OR REPLACE FUNCTION increment_user_total_orders()
            RETURNS TRIGGER AS $$
            BEGIN
                UPDATE "user"
                SET total_orders = total_orders + 1
                WHERE id = NEW.user_id;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

    await queryRunner.query(`
            CREATE TRIGGER trigger_increment_user_total_orders
            AFTER INSERT ON "order"
            FOR EACH ROW
            EXECUTE FUNCTION increment_user_total_orders();
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP TRIGGER IF EXISTS trigger_increment_user_total_orders ON "order"`,
    );
    await queryRunner.query(
      `DROP FUNCTION IF EXISTS increment_user_total_orders;`,
    );
  }
}
