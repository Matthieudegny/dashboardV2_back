import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveOrderPercentageColumns1714204800001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`order\`
      DROP COLUMN IF EXISTS order_percentageEngaged,
      DROP COLUMN IF EXISTS order_percentageStopLoss
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`order\`
      ADD COLUMN order_percentageEngaged DECIMAL(10,0) DEFAULT 0,
      ADD COLUMN order_percentageStopLoss DECIMAL(10,0) DEFAULT 0
    `);
  }
}
