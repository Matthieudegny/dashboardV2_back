import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../public.decorator';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import { UploadService } from './upload.service';

@ApiTags('Management Image')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Public()
  @Post(':folder/:name')
  //middleware to upload file
  @UseInterceptors(
    FileInterceptor('file', {
      //storage = indication of where to store the file
      storage: diskStorage({
        //destination = where to store the file
        //exemple request will be upload/NameFolder/NameFile
        //NameFolder can contain a - , that would represent a sub folder for the suborders
        //- will be remplace with / to create the subfolder
        destination: (req, file, cb) => {
          let folder: string = req.params.folder || 'default';
          console.log('category', folder);
          if (folder.includes('-')) folder = folder.replace('-', '/');
          console.log('category', folder);
          const destPath = path.resolve(
            'C:/Users/PC/Documents/code/code project/finance dashboard projet/dashboard/Images',
            folder,
          );
          if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
          }
          cb(null, destPath);
        },
        //filename = how to name the file
        filename: (req, file, cb) => {
          const name: string = req.params.name || 'default';
          console.log('name', name);
          const fileName: string =
            path.parse(file.originalname).name.replace(/\s+/g, '-') +
            '-' +
            Date.now();
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${name}${extension}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.saveFile(file, 'default');
  }

  @Delete(':fileName')
  deleteImage(@Param('fileName') fileName: string): string {
    console.log('delete image');
    const filePath = `C:/Users/PC/Documents/code/code project/finance dashboard projet/dashboard/Images/Images/${fileName}`; // Chemin vers le dossier où se trouve l'image à supprimer
    console.log('filePath', filePath);
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return 'Image supprimée avec succès';
      } else {
        return "L'image n'existe pas";
      }
    } catch (err) {
      console.error("Erreur lors de la suppression de l'image:", err);
      return "Erreur lors de la suppression de l'image";
    }
  }
}
