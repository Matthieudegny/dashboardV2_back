import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class TestService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async testConnection(): Promise<string> {
    try {
      // Connexion à la base de données MySQL
      await this.dataSource.initialize();

      console.log('Connected to MySQL database');

      // Exécution d'une requête SELECT
      const results = await this.dataSource.query('SELECT * FROM failure');

      console.log('Results:', results);

      return 'Connexion à la base de données réussie !';
    } catch (error) {
      console.error('Erreur de connexion à la base de données MySQL:', error);
      return `Échec de la connexion à la base de données : ${error.message}`;
    }
  }
}
