import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  async saveFile(file: Express.Multer.File, category: string): Promise<any> {
    // Logique pour traiter le fichier, par exemple sauvegarder les métadonnées dans une base de données.
    // Ici, nous retournons simplement un objet de confirmation.
    console.log('file', file);
    return {
      message: 'Fichier téléchargé avec succès',
      fileName: file.filename,
      filePath: file.path,
      category: category,
    };
  }
}
