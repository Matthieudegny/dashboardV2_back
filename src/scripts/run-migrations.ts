// src/scripts/run-migrations.ts
import { AppDataSource } from '../data-source';

async function runMigrations() {
  try {
    // Initialize the data source
    await AppDataSource.initialize();

    // Run migrations
    await AppDataSource.runMigrations();

    console.log('Migrations ran successfully!');

    // Destroy the data source connection
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
}

// Execute the migration function
runMigrations();
