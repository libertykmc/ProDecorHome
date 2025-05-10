import { MigrationInterface, QueryRunner } from 'typeorm';

export class Image1746804831538 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "product"
      ADD COLUMN "images" text[]
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "product"
      DROP COLUMN "images"
    `);
  }
}
